import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BadgeModule } from './badge/badge.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1', // ou o host do seu servidor MySQL
      port: 3306, // ou a porta do seu servidor MySQL
      username: 'root', // ou seu usuário do MySQL
      password: '', // a senha correta
      database: 'badge_system', // nome do seu banco de dados
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // usar apenas em desenvolvimento
    }),
    UserModule,
    BadgeModule,
  ],
})
export class AppModule {}
