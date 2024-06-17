import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from './badge.service';
import { BadgeRepository } from './badge.repository';
import { Badge } from './badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BadgeRepository])],
  providers: [BadgeService],
  exports: [BadgeService],
})
export class BadgeModule {}







