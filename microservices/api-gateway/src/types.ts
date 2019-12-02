import { ApiModelProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestWithAppContext } from './middlewares/app-context.middleware';

export enum NamespacesQueue {
  authMicro = 'auth',
  emailMicro = 'email',
  storageMicro = 'storage',
}

export type RpcTransport = { [name in NamespacesQueue]: ClientProxy };

export class MicroRequest<T = any> {
  static EMPTY = new MicroRequest({});
  constructor(public payload: T, public appContext?: RequestWithAppContext) {}
}

export class MicroResponse {
  @ApiModelProperty({ enum: ['ok', 'error'] })
  status: 'ok' | 'error';

  payload?: any;

  errorMessage?: string | string[];

  static ok<T extends MicroResponse, P>(data?: {
    payload?: P;
    errorMessage?: string;
  }): T {
    return response<T, P>('ok', data);
  }

  static error<T extends MicroResponse, P>(data?: {
    statusCode?: HttpStatus | number;
    payload?: P;
    errorMessage?: string | string[];
  }): T {
    return response<T, P>('error', data);
  }
}

function response<T extends MicroResponse, P>(
  status: 'ok' | 'error',
  data: { payload?: P; errorMessage?: string | string[] } = {},
): any {
  return {
    status,
    ...data,
  };
}

export class ChangePassword {
  @ApiModelProperty()
  password: string;

  @ApiModelProperty()
  confirmPassword: string;

  @ApiModelProperty()
  emailChangePasswordToken: string;
}

export class ForgotPassword {
  @ApiModelProperty()
  email: string;
}

export class LoginPayload {
  @ApiModelProperty()
  accessToken: string;

  @ApiModelProperty()
  refreshToken: string;
}

export class AccountPayload {}

export class TokenPayload {
  @ApiModelProperty()
  accessToken: string;
}

export class SignupPayload {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  email: string;
}

export class ForgotPasswordPayload {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  emailChangePasswordToken?: string;
}

export class BooleanResponse extends MicroResponse {
  @ApiModelProperty({
    description: 'Contains true if the action was successful - false otherwise',
  })
  payload: boolean;
}

export class LoginResponse extends MicroResponse {
  @ApiModelProperty()
  payload: LoginPayload;
}

export class AccountResponse extends MicroResponse {
  @ApiModelProperty()
  payload: AccountPayload;
}

export class SignupResponse extends MicroResponse {
  @ApiModelProperty()
  payload: SignupPayload;
}

export class ForgotPasswordResponse extends MicroResponse {
  @ApiModelProperty()
  payload: ForgotPasswordPayload;
}

export class TokenResponse extends MicroResponse {
  @ApiModelProperty()
  payload: TokenPayload;
}

export class Account {
  @ApiModelProperty({
    description: 'Should be a valid email',
  })
  email: string;

  @ApiModelProperty({
    description: 'Password should follow a specified pattern',
    pattern: '^[a-zA-Z0-9]{7,30}$',
  })
  password: string;
}

export class RoleAssignment {
  @ApiModelProperty({
    description: 'An id of the user which we want to give a role',
  })
  assignee: number;

  @ApiModelProperty({
    enum: ['patient', 'doctor', 'clinic-admin', 'super-admin', 'nurse'],
  })
  roleName: string;
}
