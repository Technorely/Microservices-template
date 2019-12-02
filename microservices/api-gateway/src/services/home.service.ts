import { Injectable } from '@nestjs/common';
import { NamespacesQueue } from '../types';
import { BaseRpcService } from './base-rpc.service';

@Injectable()
export class HomeService extends BaseRpcService {
  constructor(props) {
    super(props);
  }

  async home(data) {
    return this.auth<any>(NamespacesQueue.authMicro, 'home', data);
  }
}
