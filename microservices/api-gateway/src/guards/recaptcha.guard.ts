import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as _ from 'lodash/fp';
import { RecaptchaException } from '../exceptions/recaptcha.exception';
import { RecaptchaService } from '../services/recaptcha.service';
// import Axios from 'axios';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly recaptchaService: RecaptchaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const recaptchaResponse = request.body['g-recaptcha-response'];
    if (
      recaptchaResponse === undefined ||
      recaptchaResponse === '' ||
      recaptchaResponse === null
    ) {
      throw new RecaptchaException();
    }

    /**
     * For development
     * Get global ip addres
     */
    // const ipResponse = await Axios.get('https://api.ipify.org?format=json');
    // const ip = ipResponse.data.ip;

    const ip = request.connection.remoteAddress;

    const isValidRequest = await this.recaptchaService.verify(
      recaptchaResponse,
      ip,
    );

    if (!isValidRequest) {
      throw new RecaptchaException();
    }

    return true;
  }
}
