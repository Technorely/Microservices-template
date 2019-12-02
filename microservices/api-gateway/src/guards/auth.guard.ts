import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash/fp';
import { RequestWithAppContext } from '../middlewares/app-context.middleware';
import { Config } from '../core/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private config: Config) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as RequestWithAppContext;
    if (this.isUnprotectedRoute(req.url)) {
      return true;
    }
    const result = await this.authService.isAuthenticated(
      extractJWT(req.header('authorization')),
    );

    req.appContext.account = result && result.payload;

    return req.appContext.account && !!req.appContext.account.email;
  }

  isUnprotectedRoute(url: string): boolean {
    return _.some(
      route => _.startsWith(route, url),
      this.config.unprotectedRoutes,
    );
  }
}

export function extractJWT(authHeader: string): string {
  return _.replace('Bearer ', '', authHeader);
}
