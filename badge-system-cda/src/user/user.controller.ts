import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { BadgeService } from '../badge/badge.service'; // Importe o BadgeService

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly badgeService: BadgeService, // Injete o BadgeService aqui
  ) {}

  @Get()
  async findAllUsers() {
    try {
      const users = await this.userService.findAll(); // Exemplo: método para buscar todos os usuários
      const userBadges = await Promise.all(
        users.map(async (user) => {
          return {
            user,
            badges: await this.badgeService.findUserBadges(user.id), // Exemplo: método para encontrar os distintivos do usuário
          };
        }),
      );
      return userBadges;
    } catch (error) {
      // Lidar com erros aqui, por exemplo, log ou lançar um erro específico
      throw new Error('Erro ao buscar usuários e seus distintivos');
    }
  }
}

