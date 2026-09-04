import { Injectable } from '@nestjs/common';
import { ApiHealthResponse } from '@paso-a-paso/types';
import { GpsService } from '../gps/gps.service';

@Injectable()
export class HealthService {
  constructor(private readonly gpsService: GpsService) {}

  getStatus(): ApiHealthResponse {
    return {
      status: 'ok',
      service: 'pasa-a-paso-api',
      version: 'v1',
      timestamp: new Date().toISOString(),
      gpsProvider: this.gpsService.getProviderName(),
    };
  }
}
