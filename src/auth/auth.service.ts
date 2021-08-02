import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordValid = await this.usersService.comparePassword(
      pass,
      user.password,
    );
    delete user.password;
    return !isPasswordValid ? null : user;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, subId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
