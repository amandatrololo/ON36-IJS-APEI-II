import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioRepositoryPort } from '../../application/ports/usuario-repository.port';

@Injectable()
export class UsuarioRepository implements UsuarioRepositoryPort {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async salvar(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async buscarPorId(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id } });
  }
  async deletarUsuario(id: number ): Promise<void> {
    const usuario = await this.buscarPorId(id);
    if (usuario) {
      await this.usuarioRepository.remove(usuario);
    }
    }
}