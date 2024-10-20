import { Usuario } from '../../domain/entities/usuario.entity';

export interface UsuarioRepositoryPort {
  salvar(usuario: Usuario): Promise<Usuario>;
  buscarPorId(id: number ): Promise<Usuario>;
  deletarUsuario(id: number ): Promise<void>;
}
