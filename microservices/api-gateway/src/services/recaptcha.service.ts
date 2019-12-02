import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { Config } from '../core/config';

const RECAPTCHA_ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';

@Injectable()
export class RecaptchaService {
  constructor(private readonly config: Config) {}

  async verify(recaptchaResponse: string, remoteAddress) {
    const result = await Axios.post(RECAPTCHA_ENDPOINT, null, {
      params: {
        secret: this.config.recaptcha.secretKey,
        response: recaptchaResponse,
        remoteip: remoteAddress,
      },
    });

    return result.data.success as boolean;
  }
}
