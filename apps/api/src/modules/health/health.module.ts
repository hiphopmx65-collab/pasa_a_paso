import { Module } from '@nestjs/common';
import { GpsModule } from '../gps/gps.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [GpsModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
