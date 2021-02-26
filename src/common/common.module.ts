import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthGuard } from './authGuard';

@Module({
  imports: [JwtModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class CommonModule {}
