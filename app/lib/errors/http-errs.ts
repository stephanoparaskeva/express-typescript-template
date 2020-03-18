export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;

  readonly name!: string;

  protected constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export abstract class HTTPServerError extends Error {
  readonly statusCode!: number;

  readonly name!: string;

  protected constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message: string | object = 'Not Found') {
    super(message);
  }
}

export class HTTP500Error extends HTTPServerError {
  readonly statusCode = 500;

  constructor(message: string | object = 'Internal Server Error') {
    super(message);
  }
}
