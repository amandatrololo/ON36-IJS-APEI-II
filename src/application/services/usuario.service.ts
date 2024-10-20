import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../domain/entities/usuario.entity';
import { CriarUsuarioDto } from '../dtos/criar-usuario.dto';
import { AtualizarUsuarioDto } from '../dtos/atualizar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Cadastrar novo usuário (somente coordenador)
  async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { email: criarUsuarioDto.email } });
  
    if (usuarioExistente) {
      throw new NotFoundException('E-mail já cadastrado.');
    }
  
    const usuario = this.usuarioRepository.create(criarUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  // Atualizar informações do usuário (somente coordenador)
  async atualizarUsuario(id: number, atualizarUsuarioDto: AtualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    Object.assign(usuario, atualizarUsuarioDto); // Atualiza as propriedades do usuário
    return await this.usuarioRepository.save(usuario);
  }

  // Deletar usuário (somente coordenador)
  async deletarUsuario(id: number ): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.usuarioRepository.remove(usuario);
  }

  // Exibir todos os usuários (acessível para coordenador)
  async exibirUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  // Buscar usuário por email (para login)
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  // Buscar usuário por ID
  async buscarPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }
}
