
import{CustomAPIError} from './customError'

class BadRequestError extends CustomAPIError {
  constructor(message:string) {
    super(message);
    this.statusCode = 400;
  }
}

export{BadRequestError}
