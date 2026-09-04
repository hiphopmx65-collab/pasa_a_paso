import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  configureApp(app);

  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen(port);

  Logger.log(`API listening on http://localhost:${port}/api/v1`, 'Bootstrap');
}

bootstrap().catch((error) => {
  Logger.error(error, undefined, 'Bootstrap');
  process.exit(1);
});
