import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserBadge } from './user-badge.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserBadge, userBadge => userBadge.user)
  userBadges: UserBadge[];
}
