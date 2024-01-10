import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthBody } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return this.authService.login(authBody);
  }

  @Get()
  async authenticate() {
    return;
  }
}