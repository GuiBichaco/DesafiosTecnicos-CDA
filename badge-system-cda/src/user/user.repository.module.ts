import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository], // Exporte o UserRepository aqui se necessário
})
export class UserRepositoryModule {}
