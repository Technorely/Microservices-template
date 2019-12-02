import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';
import { RpcTransport, MicroRequest } from '../types';

@Injectable()
export abstract class BaseRpcService {
  protected constructor(@Inject('Transport') private client: RpcTransport) {}

  auth<T>(namespace: string, cmd: string, data: any): Promise<any> {
    return this.client.auth
      .send({ cmd: `${namespace}.${cmd}` }, new MicroRequest(data))
      .toPromise();
  }

  email<T>(namespace: string, cmd: string, data: any): Promise<any> {
    return this.client.email
      .send({ cmd: `${namespace}.${cmd}` }, new MicroRequest(data))
      .toPromise();
  }

  storage<T>(namespace: string, cmd: string, data: any): Promise<any> {
    return this.client.storage
      .send({ cmd: `${namespace}.${cmd}` }, new MicroRequest(data))
      .toPromise();
  }
}
