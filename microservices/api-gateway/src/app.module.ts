import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthService } from './services/auth.service';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { EmailService } from './services/email.service';
import { AuthGuard } from './guards/auth.guard';
import { GlobalExceptionFilter } from './filters/global.exception-filter';
import { AppContextMiddleware } from './middlewares/app-context.middleware';
import { AuthController } from './controllers/auth.controller';
import { HomeController } from './controllers/home.controller';
import { HomeService } from './services/home.service';
import { AccountsService } from './services/accounts.service';
import { AccountsController } from './controllers/accounts.controller';

import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';
import { RecaptchaService } from './services/recaptcha.service';

import { TwoFactorAuthenticationController } from './controllers/two-factor-authentication.controller';
import { TwoFactorAuthenticationService } from './services/two-factor-authentication.service';

const controllers = [
  TestController,
  AuthController,
  HomeController,
  AccountsController,
  TwoFactorAuthenticationController,
];

@Module({
  imports: [CoreModule],
  controllers,
  providers: [
    AuthService,
    EmailService,
    HomeService,
    AccountsService,
    TestService,
    RecaptchaService,
    TwoFactorAuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
