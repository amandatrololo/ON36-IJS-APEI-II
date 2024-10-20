import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import {  AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extrai o token JWT

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token); // Verifica a autenticidade do token
      request.user = decoded; // Adiciona informações do usuário ao request
      return decoded.role === 'COORDENADOR'; // Verifica se o usuário é coordenador
    } catch (error) {
      return false;
    }
  }
}
