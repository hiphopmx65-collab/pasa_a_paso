import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { GpsModule } from './modules/gps/gps.module';
import { HealthModule } from './modules/health/health.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { getEnvConfig } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', 'apps/api/.env'],
      load: [getEnvConfig],
    }),
    AuthModule,
    HealthModule,
    GpsModule,
    RealtimeModule,
  ],
})
export class AppModule {}
