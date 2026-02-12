from algopy import (
    logicsig,
    Txn,
    TransactionType,
    UInt64
)

@logicsig
def lunch_allowance_rule(app_id: UInt64) -> bool:

    # Must be application call
    assert Txn.type_enum == TransactionType.ApplicationCall

    # Must target our ScholarStream contract
    assert Txn.application_id == app_id

    # Limit withdrawal amount to 50 ALGO (50 * 1_000_000 microAlgos)
    assert Txn.fee <= 50_000_000

    return True
