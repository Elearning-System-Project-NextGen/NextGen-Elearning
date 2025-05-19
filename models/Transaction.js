const TransactionSchema = require("../schemas/transactionSchema");
const BaseModel = require("./BaseModel");

class Transaction extends BaseModel {
  constructor() {
    super(TransactionSchema);
  }
}

module.exports = Transaction;
