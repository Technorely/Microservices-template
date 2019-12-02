import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { configInstance } from './core/config';
import { Logger } from './core/logger';

export async function bootstrap(port?) {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();

  const swaggerOptions = new DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME)
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  if (!configInstance.isProduction) {
    SwaggerModule.setup('api/docs', app, swaggerDoc);
  }

  app.setGlobalPrefix('api');

  const me = configInstance.me;
  const logger = app.get(Logger);

  await app.startAllMicroservicesAsync();
  await app.listen(port || configInstance.port, () =>
    logger.info(
      `${me.displayName} is up and running. Visit http://localhost:${
        configInstance.port
      }/api/docs to see Swagger UI`,
    ),
  );
  return app;
}

bootstrap();
