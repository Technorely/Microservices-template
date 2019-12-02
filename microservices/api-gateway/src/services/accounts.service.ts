import { Injectable } from '@nestjs/common';
import { ChangePassword, ForgotPassword, MicroRequest } from '../types';
import { BaseRpcService } from './base-rpc.service';
import { NamespacesQueue } from '../types';

@Injectable()
export class AccountsService extends BaseRpcService {
  constructor(props) {
    super(props);
  }

  async getAccounts() {
    return this.auth<any>(NamespacesQueue.authMicro, 'getAccounts', {});
  }
}
