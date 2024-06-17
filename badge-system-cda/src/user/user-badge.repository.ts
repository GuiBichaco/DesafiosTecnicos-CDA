import { EntityRepository, Repository } from 'typeorm';
import { UserBadge } from './user-badge.entity';

@EntityRepository(UserBadge)
export class UserBadgeRepository extends Repository<UserBadge> {}
