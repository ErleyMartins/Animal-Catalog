import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Incorrect username or password');
  }

  async login({ username, id, roles }: Partial<User>): Promise<Auth> {
    const payload = { username, sub: id, roles };
    console.log(payload);
    return new Auth(this.jwtService.sign(payload));
  }
}
