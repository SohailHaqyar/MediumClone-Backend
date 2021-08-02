import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Get('/auth/me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req) {
    return req.user;
  }
}
