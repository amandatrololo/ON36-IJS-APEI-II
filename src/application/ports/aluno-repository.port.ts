import { Aluno } from '../../domain/entities/aluno.entity';

export interface AlunoRepositoryPort {
  salvar(aluno: Aluno): Promise<Aluno>;
  buscarPorId(id: string): Promise<Aluno | null>;
}
