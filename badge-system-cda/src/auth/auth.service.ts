import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.userService.findOneByPayload(payload);
  }
}
