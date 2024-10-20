import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../application/services/usuario.service'; // Serviço que lida com usuários
import { Usuario } from '../domain/entities/usuario.entity'; // Entidade de usuário para validar as credenciais

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService, // Para buscar o usuário
    private readonly jwtService: JwtService, // Para gerar tokens JWT
  ) {}

  // Valida as credenciais de login
  async validarUsuario(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioService.buscarPorEmail(email);
    if (usuario && usuario.senha === senha) {
      // Você pode melhorar isso com hashing de senha, como bcrypt
      return usuario;
    }
    return null;
  }

  // Gera o JWT quando o usuário faz login com sucesso
  async login(usuario: Usuario) {
    const payload = { email: usuario.email, sub: usuario.id, role: usuario.role };
    return {
      access_token: this.jwtService.sign(payload), // Cria um token com o payload
    };
  }
}
