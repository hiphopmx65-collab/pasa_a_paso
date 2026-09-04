import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DemoGpsProvider,
  DigitalMatterProvider,
  GpsProvider,
  QueclinkProvider,
} from '@paso-a-paso/gps';
import { GpsService } from './gps.service';

export const GPS_PROVIDER_TOKEN = 'GPS_PROVIDER_TOKEN';

@Module({
  providers: [
    {
      provide: GPS_PROVIDER_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): GpsProvider => {
        const configuredProvider = configService.get<string>('app.gpsProvider', 'demo').toLowerCase();

        switch (configuredProvider) {
          case 'digital_matter':
          case 'digital-matter':
            return new DigitalMatterProvider();
          case 'queclink':
            return new QueclinkProvider();
          case 'demo':
          default:
            return new DemoGpsProvider();
        }
      },
    },
    {
      provide: GpsService,
      inject: [GPS_PROVIDER_TOKEN],
      useFactory: (provider: GpsProvider) => new GpsService(provider),
    },
  ],
  exports: [GpsService, GPS_PROVIDER_TOKEN],
})
export class GpsModule {}
