module.exports = class MyGenericError extends Error {
  constructor(message, status) {
    super(message);
    this.error = message;
    this.status = status;
  }
};
