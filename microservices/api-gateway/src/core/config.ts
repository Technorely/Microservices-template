import 'dotenv/config';
import { Transport } from '@nestjs/microservices';

/* tslint:disable:no-var-requires */
const pkg = require('../../package.json');
/* tslint:enable:no-var-requires */

export interface Urls {
  [url: string]: string;
}

export interface MicroserviceSettings {
  name?: string;
  transport: Transport.RMQ;
  options: {
    urls: [string];
    queue?: string;
    queueOptions?: { [key: string]: any };
  };
}

export class Config {
  me: {
    displayName: string;
    version: string;
  };
  unprotectedRoutes: string[];
  isProduction: boolean;
  urls: Urls;
  port: number;
  transport: MicroserviceSettings;
  recaptcha: {
    secretKey: string;
  };
}

export const configInstance: Config = {
  isProduction: process.env.NODE_ENV === 'production',
  urls: {},
  unprotectedRoutes: [
    '/api/home',
    '/api/auth/signup',
    '/api/auth/login',
    '/api/auth/confirmation',
    '/api/auth/forgotPassword',
    '/api/auth/changePassword',
    '/api/test',
    '/api/test/recaptcha',
    '/api/auth/token',
  ],
  port: parseInt(process.env.PORT || '3000', 10),
  transport: {
    transport: Transport.RMQ,
    options: {
      urls: process.env.RABBIT_HOSTS.split(',') as any,
      queueOptions: { durable: false },
    },
  },
  me: {
    displayName: pkg.name,
    version: pkg.version,
  },
  recaptcha: {
    secretKey: process.env.RECAPTCHA_SECRET_KEY,
  },
};
