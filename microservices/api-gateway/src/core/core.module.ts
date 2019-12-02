import { Module, Provider } from '@nestjs/common';
import { Config, configInstance } from './config';
import { createLogger, Logger } from './logger';
import { NamespacesQueue } from '../types';
import { ClientProxyFactory } from '@nestjs/microservices';
import { set } from 'lodash';

const customProviders: Provider[] = [
  {
    provide: Config,
    useValue: configInstance,
  },
  {
    provide: 'Transport',
    useFactory: (config: Config) => {
      return Object.values(NamespacesQueue).reduce(
        (init, microserviceQueue) => {
          init[microserviceQueue] = ClientProxyFactory.create(
            set(config.transport, 'options.queue', microserviceQueue),
          );
          return init;
        },
        {},
      );
    },
    inject: [Config],
  },
  {
    provide: Logger,
    useFactory: (config: Config) => {
      return createLogger(config);
    },
    inject: [Config],
  },
];

@Module({
  providers: [...customProviders],
  exports: [...customProviders],
})
export class CoreModule {}
