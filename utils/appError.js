class AppError extends Error {
  constructor() {
    super();
  }
  create(status, statusText, message) {
    this.status = status;
    this.statusText = statusText;
    this.message = message;
    return this;
  }
}

export default new AppError();
