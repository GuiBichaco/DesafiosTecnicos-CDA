import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from './badge.entity';
import { UserBadge } from '../user/user-badge.entity';
import { User } from '../user/user.entity';
import { BadgeRepository } from './badge.repository';

@Injectable()
export class BadgeService {
  findUserBadges(id: number): any {
    throw new Error('Method not implemented.');
  }
  userRepository: any;
  userBadgeRepository: any;
  constructor(
    @InjectRepository(BadgeRepository)
    private readonly badgeRepository: BadgeRepository,
  ) {}

  async findAll(): Promise<Badge[]> {
    return this.badgeRepository.find();
  }
  async findBySlug(slug: string): Promise<Badge> {
    return await this.badgeRepository.findOne({ where: { slug } });
  }

  async redeemBadge(userId: number, slug: string): Promise<UserBadge> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const badge = await this.badgeRepository.findOne({ where: { slug } });
    if (!user || !badge) {
      throw new Error('User or Badge not found');
    }
    const userBadge = this.userBadgeRepository.create({ user, badge });
    return this.userBadgeRepository.save(userBadge);
  }

  async getBadgesForUser(userId: number): Promise<Badge[]> {
    const userBadges = await this.userBadgeRepository.find({ where: { user: { id: userId } }, relations: ['badge'] });
    return userBadges.map(ub => ub.badge);
  }
}
