import { Module } from '@nestjs/common';
import { AuthPreparationService } from './auth.service';

@Module({
  providers: [AuthPreparationService],
  exports: [AuthPreparationService],
})
export class AuthModule {}
