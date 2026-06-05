class ExpressError extends Error {
  constructor(status, errmsg) {
    super();
    this.status = status;
    this.errmsg = errmsg;
  }
}
module.exports = ExpressError;
