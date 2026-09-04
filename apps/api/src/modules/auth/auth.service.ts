import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthPreparationService {
  constructor(private readonly configService: ConfigService) {}

  getSupabaseJwtConfig() {
    return {
      issuer: this.configService.get<string>('app.supabaseJwtIssuer'),
      audience: this.configService.get<string>('app.supabaseJwtAudience'),
      url: this.configService.get<string>('app.supabaseUrl'),
      strategyStatus: 'prepared',
    };
  }
}
