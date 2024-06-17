import { Injectable } from '@nestjs/common';
import { UserBadge } from './user-badge.entity'; 

@Injectable()
export class UserBadgeService {
  findBadgeById(_badgeId: number) {
    throw new Error('Method not implemented.');
  }
  private userBadges: { userId: number, badgeId: number }[] = [];

  async getUserBadges(userId: number): Promise<{ userId: number, badgeId: number }[]> {
    return this.userBadges.filter(ub => ub.userId === userId);
  }

  async checkUserHasBadge(userId: number, badgeId: number): Promise<boolean> {
    return this.userBadges.some(ub => ub.userId === userId && ub.badgeId === badgeId);
  }

  async registerUserBadge(userId: number, badgeId: number): Promise<void> {
    this.userBadges.push({ userId, badgeId });
  }
}
