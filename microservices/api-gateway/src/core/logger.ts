import * as pino from 'pino';
import { Config } from './config';

export class Logger {
  info: pino.LogFn;
  debug: pino.LogFn;
  error: pino.LogFn;
  warn: pino.LogFn;
}

export function createLogger(config: Config): Logger {
  const baseSettings = {
    name: config.me.displayName,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  };

  if (config.isProduction) {
    return pino({
      ...baseSettings,
      level: 'info',
      prettyPrint: false,
    });
  }

  return pino({
    ...baseSettings,
    level: 'debug',
    prettyPrint: {
      colorize: true,
    } as any,
  });
}
