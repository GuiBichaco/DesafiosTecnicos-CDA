import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeRepository } from './badge/badge.repository'; // Importe o BadgeRepository
import { UserBadgeRepository } from './user/user-badge.repository'; // Importe o UserBadgeRepository
import { UserRepository } from './user/user.repository'; // Importe o UserRepository

@Module({
  imports: [
    TypeOrmModule.forFeature([BadgeRepository]),
    UserBadgeRepository,
    UserRepository,
  ],
  exports: [
    TypeOrmModule.forFeature([BadgeRepository]),
    UserBadgeRepository,
    UserRepository,
  ],
})
export class RepositoryModule {}
