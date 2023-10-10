class CustomHttpError extends Error {
  httpStatusCode;
  timestamp;
  constructor(
    httpStatusCode: number,
    message: string,
  ) {
    if (message) {
      super(message);
    } else {
      super("A generic error occurred!");
    }

    // initializ the class properties
    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date().toISOString();

    // attach a call stack to the current class,
    // preventing the constructor call to appear in the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomHttpError;
