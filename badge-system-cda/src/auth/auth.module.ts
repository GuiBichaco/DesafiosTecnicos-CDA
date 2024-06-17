import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserBadgeRepository } from '../user/user-badge.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, UserBadgeRepository],
})
export class AuthModule {}
export class UserBadgeModule {}
