import { Controller, Post, Body, ForbiddenException, NotFoundException, ConflictException, Get } from '@nestjs/common';
import { RedeemDto } from './redeem.dto';
import { UserBadgeService } from '../user/user-badge.service';
import { UserService } from '../user/user.service';
import { BadgeService } from './badge.service';
import { Badge } from './badge.entity';

@Controller('badges')
export class BadgeController {
  constructor(
    private readonly badgeService: BadgeService,
    private readonly userService: UserService, // Injete o UserService aqui
    private readonly userBadgeService: UserBadgeService,){}

  @Get()
  async findAll(): Promise<Badge[]> {
    return this.badgeService.findAll();
  }
  @Post('redeem')
  async redeemBadge(@Body() redeemDto: RedeemDto) {
    const { userId, slug } = redeemDto;

    try {
      const userHasPermission = await this.userService.checkPermission(userId);
      if (!userHasPermission) {
        throw new ForbiddenException('Você não tem permissão para resgatar emblemas.');
      }

      const badge = await this.badgeService.findBySlug(slug);
      if (!badge) {
        throw new NotFoundException(`Não foi encontrado um emblema com o slug ${slug}.`);
      }

      const userHasBadge = await this.userBadgeService.checkUserHasBadge(userId, badge.id);
      if (userHasBadge) {
        throw new ConflictException(`Você já possui o emblema ${badge.name}.`);
      }

      await this.userBadgeService.registerUserBadge(userId, badge.id);

      return { message: `Emblema ${badge.name} resgatado com sucesso.` };
    } catch (error) {
      throw error;
    }
  }
}
