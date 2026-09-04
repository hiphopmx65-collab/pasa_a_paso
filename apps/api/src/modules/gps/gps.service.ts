import { Injectable } from '@nestjs/common';
import { DemoGpsProvider, GpsProvider } from '@paso-a-paso/gps';
import { GpsTrackerRequest, NormalizedGpsPosition } from '@paso-a-paso/types';

@Injectable()
export class GpsService {
  constructor(private readonly provider: GpsProvider) {
    if (this.provider instanceof DemoGpsProvider) {
      this.provider.primeTracker('demo-tracker-1');
    }
  }

  async getPosition(request: GpsTrackerRequest): Promise<NormalizedGpsPosition> {
    return this.provider.getPosition(request);
  }

  getProviderName(): string {
    return this.provider.provider;
  }
}
