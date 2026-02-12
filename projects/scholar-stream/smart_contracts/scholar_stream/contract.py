from algopy import ARC4Contract, arc4, Global, Txn, UInt64, itxn, BoxMap


class ScholarStream(ARC4Contract):

    # Storage: beneficiary -> packed stream data
    streams: BoxMap[arc4.Address, UInt64]

    def __init__(self) -> None:
        self.streams = BoxMap(arc4.Address, UInt64)

    # -------------------------
    # Create Stream
    # -------------------------
    @arc4.abimethod
    def create_stream(
        self,
        beneficiary: arc4.Address,
        total_amount: UInt64,
        duration_seconds: UInt64,
    ) -> None:

        # Pack stream data into single UInt64 storage
        packed = (
            total_amount
            | (Global.latest_timestamp << 64)
            | (duration_seconds << 128)
            | (UInt64(0) << 192)
        )

        self.streams[beneficiary] = packed

    # -------------------------
    # Withdraw Streamed Funds
    # -------------------------
    @arc4.abimethod
    def withdraw(self) -> None:

        # Convert sender into ARC4 Address
        sender_address = arc4.Address(Txn.sender)

        stream = self.streams[sender_address]

        total = stream & ((1 << 64) - 1)
        start_time = (stream >> 64) & ((1 << 64) - 1)
        duration = (stream >> 128) & ((1 << 64) - 1)
        withdrawn = (stream >> 192) & ((1 << 64) - 1)

        elapsed = Global.latest_timestamp - start_time

        # Clamp elapsed time
        if elapsed > duration:
            elapsed = duration

        vested = (total * elapsed) // duration
        withdrawable = vested - withdrawn

        assert withdrawable > 0

        # Inner payment transaction
        itxn.Payment(
            receiver=Txn.sender,
            amount=withdrawable,
        ).submit()

        # Update withdrawn amount
        new_packed = (
            total
            | (start_time << 64)
            | (duration << 128)
            | ((withdrawn + withdrawable) << 192)
        )

        self.streams[sender_address] = new_packed

    # -------------------------
    # Delegated Withdraw
    # -------------------------
    @arc4.abimethod
    def delegate_withdraw(self) -> None:
        self.withdraw()
