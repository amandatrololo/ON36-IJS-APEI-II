import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: any) {
    return this.authService.login(user); // Gera e retorna o token JWT
  }
}
