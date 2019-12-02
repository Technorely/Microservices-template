import { Injectable } from '@nestjs/common';
import { NamespacesQueue } from '../types';
import { BaseRpcService } from './base-rpc.service';

@Injectable()
export class TestService extends BaseRpcService {
  constructor(props) {
    super(props);
  }

  async createModel(data) {
    return this.auth<any>(NamespacesQueue.authMicro, 'createModel', data);
  }
}
