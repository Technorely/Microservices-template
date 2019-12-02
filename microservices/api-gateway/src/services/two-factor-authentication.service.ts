import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Config } from '../core/config';
import { BaseRpcService } from './base-rpc.service';
import { NamespacesQueue, ChangePassword } from '../types';

@Injectable()
export class TwoFactorAuthenticationService extends BaseRpcService {
  constructor(props) {
    super(props);
  }

  public generateQRCode(params: { email: string }) {
    return this.auth<any>(NamespacesQueue.authMicro, 'renderQRCode', params);
  }

  public codeVerify(params: { email: string; code: string }) {
    return this.auth<any>(NamespacesQueue.authMicro, 'codeVerify', params);
  }

  public enableTFA(params: { email: string; code: string }) {
    return this.auth<any>(NamespacesQueue.authMicro, 'enableTFA', params);
  }

  public disableTFA(params: { code: string; email: string }) {
    return this.auth<any>(NamespacesQueue.authMicro, 'disableTFA', params);
  }
}
