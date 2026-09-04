import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { API_PREFIX } from '@paso-a-paso/config';
import { getAllowedCorsOrigins } from './common/cors-origins';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: getAllowedCorsOrigins(),
    credentials: true,
  });
  app.useLogger(new Logger());
}
