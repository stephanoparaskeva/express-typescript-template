export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;

  readonly name!: string;

  constructor(message: object | string) {
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

  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// client erros.
export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(message: string | object = 'Bad Request') {
    super(message);
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor(message: string | object = 'Unauthorized') {
    super(message);
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor(message: string | object = 'Forbidden') {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message: string | object = 'Not Found') {
    super(message);
  }
}
export class HTTP405Error extends HTTPClientError {
  readonly statusCode = 405;

  constructor(message: string | object = 'Method Not Allowed') {
    super(message);
  }
}

export class HTTP406Error extends HTTPClientError {
  readonly statusCode = 406;

  constructor(message: string | object = 'Not Acceptable') {
    super(message);
  }
}

export class HTTP407Error extends HTTPClientError {
  readonly statusCode = 407;

  constructor(message: string | object = 'Proxy Authentication Required') {
    super(message);
  }
}

export class HTTP408Error extends HTTPClientError {
  readonly statusCode = 408;

  constructor(message: string | object = 'Request Timeout') {
    super(message);
  }
}

export class HTTP409Error extends HTTPClientError {
  readonly statusCode = 409;

  constructor(message: string | object = 'Conflict') {
    super(message);
  }
}

export class HTTP410Error extends HTTPClientError {
  readonly statusCode = 410;

  constructor(message: string | object = 'Gone') {
    super(message);
  }
}

export class HTTP413Error extends HTTPClientError {
  readonly statusCode = 413;

  constructor(message: string | object = 'Payload Too Large') {
    super(message);
  }
}

export class HTTP422Error extends HTTPClientError {
  readonly statusCode = 422;

  constructor(message: string | object = 'Unprocessable Entity') {
    super(message);
  }
}

export class HTTP429Error extends HTTPClientError {
  readonly statusCode = 429;

  constructor(message: string | object = 'Too Many Requests') {
    super(message);
  }
}

// server errors.
export class HTTP500Error extends HTTPServerError {
  readonly statusCode = 500;

  constructor(message: string | object = 'Internal Server Error') {
    super(message);
  }
}

export class HTTP501Error extends HTTPServerError {
  readonly statusCode = 501;

  constructor(message: string | object = 'Not Implemented') {
    super(message);
  }
}

export class HTTP502Error extends HTTPServerError {
  readonly statusCode = 502;

  constructor(message: string | object = 'Bad Gateway') {
    super(message);
  }
}

export class HTTP503Error extends HTTPServerError {
  readonly statusCode = 503;

  constructor(message: string | object = 'Service Unavailable') {
    super(message);
  }
}

export class HTTP504Error extends HTTPServerError {
  readonly statusCode = 504;

  constructor(message: string | object = 'Gateway Timeout') {
    super(message);
  }
}

export class HTTP511Error extends HTTPServerError {
  readonly statusCode = 511;

  constructor(message: string | object = 'Network Authentication Required') {
    super(message);
  }
}
