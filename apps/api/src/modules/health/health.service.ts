import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiHealthResponse } from '@paso-a-paso/types';

@Injectable()
export class HealthService {
  constructor(private readonly configService: ConfigService) {}

  getStatus(): ApiHealthResponse {
    return {
      status: 'ok',
      service: 'pasa-a-paso-api',
      version: 'v1',
      timestamp: new Date().toISOString(),
      gpsProvider: this.configService.get<string>('app.gpsProvider', 'demo'),
    };
  }
}
