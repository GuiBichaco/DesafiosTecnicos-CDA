import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBadgeRepository } from './user-badge.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserBadgeRepository])],
  exports: [TypeOrmModule],
})
export class UserBadgeModule {}
