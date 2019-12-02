import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

export interface RequestWithAppContext extends Request {
  appContext: {
    account?: {
      id: number;
      email: string;
    };
  };
}

@Injectable()
export class AppContextMiddleware implements NestMiddleware {
  resolve(...args: any[]) {
    return (req, res, next) => {
      req.appContext = req.appContext || {};
      next();
    };
  }
}
