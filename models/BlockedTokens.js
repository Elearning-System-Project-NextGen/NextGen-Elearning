const BlockedTokensSchema = require("../schemas/blockedTokensSchema");
const BaseModel = require("./BaseModel");

class BlockedTokens extends BaseModel {
  constructor() {
    super(BlockedTokensSchema);
  }
}

module.exports = BlockedTokens;
