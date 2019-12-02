import { Injectable } from '@nestjs/common';
import { ChangePassword, ForgotPassword } from '../types';
import { BaseRpcService } from './base-rpc.service';
import { NamespacesQueue } from '../types';

@Injectable()
export class AuthService extends BaseRpcService {
  constructor(props) {
    super(props);
  }

  async isAuthenticated(accessToken: string) {
    return this.auth<any>(NamespacesQueue.authMicro, 'isAuthenticated', {
      accessToken,
    });
  }

  async login(data: any) {
    return this.auth<any>(NamespacesQueue.authMicro, 'login', data);
  }

  async logout(accessToken: string) {
    return this.auth<any>(NamespacesQueue.authMicro, 'logout', accessToken);
  }

  async signup(data: any) {
    return this.auth<any>(NamespacesQueue.authMicro, 'signup', data);
  }

  async confirmAccount(emailToken: string) {
    return this.auth<any>(
      NamespacesQueue.authMicro,
      'confirmAccount',
      emailToken,
    );
  }

  async forgotPassword(forgotPassword: ForgotPassword) {
    return this.auth<any>(
      NamespacesQueue.authMicro,
      'forgotPassword',
      forgotPassword,
    );
  }

  async changePassword(
    changePassword: ChangePassword & { accessToken: string },
  ) {
    return this.auth<any>(
      NamespacesQueue.authMicro,
      'changePassword',
      changePassword,
    );
  }

  async token(refreshToken: string) {
    return this.auth<any>(NamespacesQueue.authMicro, 'token', refreshToken);
  }

  async assignRole(roleAssignment: {
    assigner: number;
    assignee: number;
    roleName: string;
  }) {
    return this.auth<any>(
      NamespacesQueue.authMicro,
      'assignRole',
      roleAssignment,
    );
  }
}
