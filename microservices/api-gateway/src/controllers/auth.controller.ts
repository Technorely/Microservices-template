import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { RequestWithAppContext } from '../middlewares/app-context.middleware';
import { AuthService } from '../services/auth.service';
import {
  ApiBearerAuth,
  ApiImplicitHeader,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  BooleanResponse,
  ChangePassword,
  ForgotPassword,
  ForgotPasswordResponse,
  LoginResponse,
  MicroResponse,
  RoleAssignment,
  SignupResponse,
  TokenResponse,
  Account,
} from '../types';

import * as _ from 'lodash/fp';
import { EmailService } from '../services/email.service';
import { extractJWT } from '../guards/auth.guard';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Post('login')
  @ApiResponse({ type: LoginResponse, status: HttpStatus.OK } as any)
  async login(@Body() account: Account): Promise<LoginResponse> {
    return this.authService.login(account);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiResponse({ type: MicroResponse, status: HttpStatus.OK } as any)
  async logout(
    @Headers('authorization') authorization = '',
  ): Promise<MicroResponse> {
    return this.authService.logout(authorization.replace('Bearer ', ''));
  }

  @Post('signup')
  @ApiResponse({ type: SignupResponse, status: HttpStatus.OK } as any)
  async signup(@Body() account: Account): Promise<SignupResponse> {
    const { status, payload } = await this.authService.signup(account);

    // await this.emailService.sendRegistration({
    //   email: payload.email,
    //   link: `/api/auth/confirmation/${payload.emailConfirmationToken}`,
    // });

    return {
      status,
      payload,
    };
  }

  @Get('confirmation/:emailConfirmationToken')
  @ApiResponse({
    type: BooleanResponse,
    status: HttpStatus.OK,
  } as any)
  async confirmAccount(
    @Param('emailConfirmationToken') emailConfirmationToken,
  ): Promise<BooleanResponse> {
    return this.authService.confirmAccount(emailConfirmationToken);
  }

  @Post('forgotPassword')
  @ApiResponse({ type: ForgotPasswordResponse, status: HttpStatus.OK } as any)
  async forgotPassword(
    @Body() forgotPassword: ForgotPassword,
  ): Promise<ForgotPasswordResponse> {
    const { status, payload } = await this.authService.forgotPassword(
      forgotPassword,
    );

    await this.emailService.sendForgotPassword({
      email: payload.email,
      link: `/forgotPassword/${payload.emailChangePasswordToken}`,
    });

    return {
      status,
      // @ts-ignore
      payload: _.omit(['emailChangePasswordToken'], payload),
    };
  }

  @Post('changePassword')
  @ApiResponse({ type: BooleanResponse, status: HttpStatus.OK } as any)
  async changePassword(
    @Headers('authorization') authHeader: string,
    @Body() changePassword: ChangePassword,
  ): Promise<BooleanResponse> {
    return this.authService.changePassword({
      ...changePassword,
      accessToken: extractJWT(authHeader),
    });
  }

  @Post('token')
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-refresh-token',
    required: true,
    description:
      'In order to get an access token - a refresh token should be provided',
  })
  @ApiResponse({ type: TokenResponse, status: HttpStatus.OK } as any)
  async token(
    @Headers('x-refresh-token') refreshToken = '',
  ): Promise<TokenResponse> {
    return this.authService.token(refreshToken);
  }

  @Post('assignRole')
  @ApiBearerAuth()
  @ApiResponse({ type: BooleanResponse, status: HttpStatus.OK } as any)
  async assignRole(
    @Req() req: RequestWithAppContext,
    @Body() roleAssignment: RoleAssignment = {} as any,
  ): Promise<BooleanResponse> {
    return this.authService.assignRole({
      ...roleAssignment,
      assigner: req.appContext.account.id,
    });
  }
}
