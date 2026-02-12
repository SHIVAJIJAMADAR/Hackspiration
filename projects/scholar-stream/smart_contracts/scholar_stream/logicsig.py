from algopy import (
    logicsig,
    Txn,
    TransactionType,
    Global,
    UInt64
)

@logicsig
def lunch_allowance_rule(app_id: UInt64) -> bool:

    # Must be application call
    assert Txn.type_enum == TransactionType.ApplicationCall

    # Must target our contract
    assert Txn.application_id == app_id

    # Ensure group transaction exists
    # (withdraw inner payment triggered by app)
    assert Global.group_size >= 1

    # Limit withdrawal to 50 ALGO (microAlgos)
    assert Txn.amount <= 50_000_000

    return True
