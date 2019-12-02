import { HttpException, HttpStatus } from '@nestjs/common';

export class RecaptchaException extends HttpException {
  constructor() {
    super('reCAPTCHA not confirmed', HttpStatus.BAD_REQUEST);
  }
}
