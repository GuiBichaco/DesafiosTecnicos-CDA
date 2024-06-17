import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  getUsers() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findOneByPayload(payload: any): Promise<User> {
    const { id } = payload;
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
  private users: { id: number, hasPermission: boolean }[] = [
    { id: 1, hasPermission: true },
    // Adicione mais usuários conforme necessário
  ];

  async checkPermission(userId: number): Promise<boolean> {
    const user = this.users.find(user => user.id === userId);
    return user ? user.hasPermission : false;
  }
}
