import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extrai o token JWT

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const decoded = this.jwtService.verify(token); // Verifica a autenticidade do token
      request.user = decoded; // Adiciona as informações do usuário no request (incluindo ID)
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
