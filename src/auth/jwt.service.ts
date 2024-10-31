import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../application/services/usuario.service'; 
import { Usuario } from '../domain/entities/usuario.entity'; 
import { FazLoginDto } from '@app/dtos/faz-login.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly ID_PREDEFINIDO = 22; // ID fixo do coordenador
  private readonly ROLE_COORDENADOR = 'COORDENADOR'; // Função de coordenador

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) {}

  // Valida as credenciais de login (email e senha)
  async validarUsuario(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioService.buscarPorEmail(email);
    
    // Verifica se o usuário existe e se a senha está correta (usando bcryptjs)
    if (usuario && await bcryptjs.compare(senha, usuario.senha)) { 
      return usuario;
    }
    return null;
  }

  // Verifica se o usuário tem a função COORDENADOR
  private validarFuncaoCoordenador(usuario: Usuario): void {
    if (usuario.funcao !== this.ROLE_COORDENADOR) {
      throw new ForbiddenException('Acesso negado: função insuficiente');
    }
  }

  // Verifica se o ID predefinido pode ser usado (apenas para COORDENADOR)
  private validarIdPredefinido(usuario: Usuario, id: number): void {
    if (usuario.funcao === this.ROLE_COORDENADOR && id !== this.ID_PREDEFINIDO) {
      throw new UnauthorizedException('ID predefinido inválido para coordenador');
    }
  }

  // Gera o JWT quando o usuário faz login com sucesso
  async login(dto: FazLoginDto): Promise<{ access_token: string }> {
    // Valida o usuário (email e senha)
    const usuario = await this.validarUsuario(dto.email, dto.senha);
    
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Se o usuário for coordenador, validamos o ID
    if (usuario.funcao === this.ROLE_COORDENADOR) {
      this.validarIdPredefinido(usuario, dto.id); // Valida o ID predefinido do coordenador
    }
    
    // Cria o payload do JWT com os dados do usuário
    const payload = { email: usuario.email, sub: usuario.id, funcao: usuario.funcao };
    
    // Retorna o token JWT gerado
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
