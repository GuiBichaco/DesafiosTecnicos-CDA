import { getRepository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Badge } from './badge/badge.entity';

async function paginateBadges(options: IPaginationOptions): Promise<Pagination<Badge>> {
  return paginate<Badge>(getRepository(Badge), options);
}
