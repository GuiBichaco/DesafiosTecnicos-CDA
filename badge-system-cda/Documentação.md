### Badge System CDA - Documentação do projeto

---

## Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Endpoints da API](#endpoints-da-api)
6. [Guia do Desenvolvedor](#guia-do-desenvolvedor)
7. [Considerações Finais](#considerações-finais)

---

## Visão Geral do Projeto

O **Badge System CDA** é um sistema desenvolvido para gerenciar usuários e seus respectivos badges (distintivos). O projeto é construído utilizando o framework **NestJS**, que é um framework de Node.js para construir aplicativos do lado do servidor de forma eficiente e escalável.

---

## Funcionalidades

1. **Gerenciamento de Usuários**:
   - Criação de usuários.
   - Listagem de usuários.
   - Atualização de informações de usuários.
   - Remoção de usuários.

2. **Gerenciamento de Badges**:
   - Criação de badges.
   - Listagem de badges.
   - Atualização de informações de badges.
   - Remoção de badges.
   - Atribuição de badges a usuários.

---

## Estrutura do Projeto

A estrutura do projeto segue a convenção padrão do NestJS. Abaixo está uma visão geral da estrutura do diretório:

```
badge-system-cda/
├── src/
│   ├── badge/
│   │   ├── badge.controller.ts
│   │   ├── badge.module.ts
│   │   ├── badge.service.ts
│   │   ├── badge.entity.ts
│   │   ├── badge.repository.ts
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   ├── user.entity.ts
│   │   ├── user.repository.ts
│   ├── app.module.ts
├── .env
├── package.json
├── tsconfig.json
```

---

## Instalação e Configuração

### Pré-requisitos

- Node.js (v14 ou superior)
- NPM ou Yarn
- MySQL (ou outro banco de dados configurado)

### Passos de Instalação

1. **Clone o Repositório**

```bash
git clone https://github.com/seu-usuario/badge-system-cda.git
cd badge-system-cda
```

2. **Instale as Dependências**

```bash
npm install
```

3. **Configure o Banco de Dados**

Crie um arquivo `.env` na raiz do projeto e adicione as configurações do banco de dados:

```
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = localhost
TYPEORM_PORT = 3306
TYPEORM_USERNAME = root
TYPEORM_PASSWORD = senha
TYPEORM_DATABASE = nome_do_banco
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = true
TYPEORM_ENTITIES = dist/**/*.entity.js
```

4. **Execute as Migrações (se houver)**

```bash
npm run typeorm migration:run
```

5. **Inicie o Servidor**

```bash
npm run start
```

---

## Endpoints da API

### Usuários

- **GET /users**
  - Descrição: Lista todos os usuários.
  - Resposta: Lista de usuários.

- **POST /users**
  - Descrição: Cria um novo usuário.
  - Corpo da Requisição: Dados do usuário.
  - Resposta: Usuário criado.

- **PUT /users/:id**
  - Descrição: Atualiza um usuário existente.
  - Parâmetros: ID do usuário.
  - Corpo da Requisição: Dados atualizados do usuário.
  - Resposta: Usuário atualizado.

- **DELETE /users/:id**
  - Descrição: Remove um usuário existente.
  - Parâmetros: ID do usuário.
  - Resposta: Mensagem de sucesso ou erro.

### Badges

- **GET /badges**
  - Descrição: Lista todos os badges.
  - Resposta: Lista de badges.

- **POST /badges**
  - Descrição: Cria um novo badge.
  - Corpo da Requisição: Dados do badge.
  - Resposta: Badge criado.

- **PUT /badges/:id**
  - Descrição: Atualiza um badge existente.
  - Parâmetros: ID do badge.
  - Corpo da Requisição: Dados atualizados do badge.
  - Resposta: Badge atualizado.

- **DELETE /badges/:id**
  - Descrição: Remove um badge existente.
  - Parâmetros: ID do badge.
  - Resposta: Mensagem de sucesso ou erro.

---

## Guia do Desenvolvedor

### Configuração do `UserModule`

- `user.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Outros campos conforme necessário
}
```

- `user.repository.ts`

```typescript
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
```

- `user.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  // Métodos do serviço conforme necessário
}
```

- `user.controller.ts`

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
```

- `user.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { BadgeModule } from '../badge/badge.module';

@Module({
  imports: [
    TypeOrmModule

## Configuração do `BadgeModule`

- `badge.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // Outros campos conforme necessário
}
```

- `badge.repository.ts`

```typescript
import { EntityRepository, Repository } from 'typeorm';
import { Badge } from './badge.entity';

@EntityRepository(Badge)
export class BadgeRepository extends Repository<Badge> {}
```

- `badge.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadgeRepository } from './badge.repository';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(BadgeRepository)
    private readonly badgeRepository: BadgeRepository,
  ) {}

  // Métodos do serviço conforme necessário
}
```

- `badge.controller.ts`

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BadgeService } from './badge.service';

@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  findAll() {
    return this.badgeService.findAll();
  }

  @Post()
  create(@Body() createBadgeDto: any) {
    return this.badgeService.create(createBadgeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBadgeDto: any) {
    return this.badgeService.update(id, updateBadgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.badgeService.remove(id);
  }
}
```

- `badge.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { BadgeRepository } from './badge.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BadgeRepository])],
  controllers: [BadgeController],
  providers: [BadgeService],
  exports: [BadgeService],
})
export class BadgeModule {}
```

---

## Instalação e Configuração

### Pré-requisitos

- Node.js (v14 ou superior)
- NPM ou Yarn
- MySQL (ou outro banco de dados configurado)

### Passos de Instalação

1. **Clone o Repositório**

```bash
git clone https://github.com/seu-usuario/badge-system-cda.git
cd badge-system-cda
```

2. **Instale as Dependências**

```bash
npm install
```

3. **Configure o Banco de Dados**

Crie um arquivo `.env` na raiz do projeto e adicione as configurações do banco de dados:

```
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = localhost
TYPEORM_PORT = 3306
TYPEORM_USERNAME = root
TYPEORM_PASSWORD = senha
TYPEORM_DATABASE = nome_do_banco
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = true
TYPEORM_ENTITIES = dist/**/*.entity.js
```

4. **Execute as Migrações (se houver)**

```bash
npm run typeorm migration:run
```

5. **Inicie o Servidor**

```bash
npm run start
```

---

## Endpoints da API

### Usuários

- **GET /users**
  - Descrição: Lista todos os usuários.
  - Resposta: Lista de usuários.

- **POST /users**
  - Descrição: Cria um novo usuário.
  - Corpo da Requisição: Dados do usuário.
  - Resposta: Usuário criado.

- **PUT /users/:id**
  - Descrição: Atualiza um usuário existente.
  - Parâmetros: ID do usuário.
  - Corpo da Requisição: Dados atualizados do usuário.
  - Resposta: Usuário atualizado.

- **DELETE /users/:id**
  - Descrição: Remove um usuário existente.
  - Parâmetros: ID do usuário.
  - Resposta: Mensagem de sucesso ou erro.

### Badges

- **GET /badges**
  - Descrição: Lista todos os badges.
  - Resposta: Lista de badges.

- **POST /badges**
  - Descrição: Cria um novo badge.
  - Corpo da Requisição: Dados do badge.
  - Resposta: Badge criado.

- **PUT /badges/:id**
  - Descrição: Atualiza um badge existente.
  - Parâmetros: ID do badge.
  - Corpo da Requisição: Dados atualizados do badge.
  - Resposta: Badge atualizado.

- **DELETE /badges/:id**
  - Descrição: Remove um badge existente.
  - Parâmetros: ID do badge.
  - Resposta: Mensagem de sucesso ou erro.

### Atribuição de Badges a Usuários

- **POST /users/:userId/badges/:badgeId**
  - Descrição: Atribui um badge a um usuário.
  - Parâmetros: ID do usuário, ID do badge.
  - Resposta: Mensagem de sucesso ou erro.

---

## Guia do Desenvolvedor

### Configuração de Dependências

Certifique-se de que as dependências necessárias estejam instaladas e configuradas corretamente no seu `package.json`.

### Configuração do Banco de Dados

Certifique-se de que o TypeORM esteja configurado corretamente para se conectar ao seu banco de dados. Verifique o arquivo `.env` para garantir que todas as variáveis de ambiente necessárias estejam definidas.

### Adicionando Novas Funcionalidades

Para adicionar novas funcionalidades, siga os passos abaixo:

1. **Crie uma nova entidade** no diretório `src/`.
2. **Crie um novo repositório** para a entidade.
3. **Crie um novo serviço** para lidar com a lógica de negócios relacionada à entidade.
4. **Crie um novo controlador** para expor os endpoints da API relacionados à entidade.
5. **Adicione a entidade, repositório, serviço e controlador ao módulo correspondente**.

### Exemplo de Adição de Nova Funcionalidade

Suponha que queremos adicionar uma funcionalidade para gerenciar "Projects".

1. **Crie a entidade Project**:

```typescript
// src/project/project.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
```

2. **Crie o repositório Project**:

```typescript
// src/project/project.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {}
```

3. **Crie o serviço Project**:

```typescript
// src/project/project.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
  ) {}

  // Métodos do serviço conforme necessário
}
```

4. **Crie o controlador Project**:

```typescript
// src/project/project.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Post()
  create(@Body() createProjectDto: any) {
    return this.projectService.create(createProjectDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: any) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
```

5. **Adicione ao módulo Project**:

```typescript
// src/project/project.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
```

6. **Importe o módulo Project no AppModule**:

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BadgeModule } from './badge/badge.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    BadgeModule,
    ProjectModule,
  ],
})
export class AppModule {}
```

---

## Considerações Finais

Este projeto serve como um exemplo de um sistema básico de gerenciamento de usuários e badges utilizando NestJS. Ele pode ser expandido e adaptado conforme necessário para incluir funcionalidades adicionais e integrar-se com outros sistemas.

Para mais informações sobre NestJS, consulte a [

documentação oficial](https://docs.nestjs.com/).

---

**Autor**: Guilherme (substitua com seu nome ou equipe)  
**Versão**: 1.0.0  
**Data de Criação**: 15 de Junho de 2024
