import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../domain/entities/usuario.entity';
import { CriarUsuarioDto } from '../dtos/criar-usuario.dto';
import { AtualizarUsuarioDto } from '../dtos/atualizar-usuario.dto';
import * as bcryptjs from 'bcryptjs';
import { UsuarioRepositoryPort } from '../../application/ports/usuario-repository.port';

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
    throw new ConflictException('E-mail já cadastrado.'); // Correção: lança ConflictException
  }

  // Criptografar a senha antes de salvar
  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(criarUsuarioDto.senha, salt);

  const novoUsuario = this.usuarioRepository.create({
    ...criarUsuarioDto,
    senha: hashedPassword, // Armazena a senha criptografada
  });

  return await this.usuarioRepository.save(novoUsuario);
}

  // Atualizar informações do usuário (somente coordenador)
  async atualizarUsuario(id: number, atualizarUsuarioDto: AtualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

        // Se houver nova senha, criptografa antes de salvar
    if (atualizarUsuarioDto.senha) {
      const salt = await bcryptjs.genSalt();
      const hashedPassword = await bcryptjs.hash(atualizarUsuarioDto.senha, salt);
      atualizarUsuarioDto.senha = hashedPassword;
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
