import { Injectable } from '@nestjs/common';
import { NamespacesQueue } from '../types';
import { BaseRpcService } from './base-rpc.service';

interface EmailParams {
  email: string;
  link: string;
}

@Injectable()
export class EmailService extends BaseRpcService {
  constructor(props) {
    super(props);
  }

  sendRegistration(params: EmailParams) {
    return this.email(NamespacesQueue.emailMicro, 'registration', params);
  }

  sendForgotPassword(params: EmailParams) {
    return this.email(NamespacesQueue.emailMicro, 'forgotPassword', params);
  }
}
