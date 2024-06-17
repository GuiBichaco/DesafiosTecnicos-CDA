import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { BadgeModule } from '../badge/badge.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    BadgeModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}








