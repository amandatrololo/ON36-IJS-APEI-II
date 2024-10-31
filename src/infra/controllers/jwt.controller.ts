import { Controller, Post, Body, UnauthorizedException} from '@nestjs/common';
import { AuthService } from '../../auth/jwt.service';
import { ApiTags } from '@nestjs/swagger';
import { FazLoginDto } from '../../application/dtos/faz-login.dto';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: FazLoginDto): Promise<{ access_token: string }> {
    // O AuthService é responsável pela lógica de autenticação
    const token = await this.authService.login(dto);
    
    if (!token) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Retorna o token JWT se a autenticação for bem-sucedida
    return token;
  }
}
