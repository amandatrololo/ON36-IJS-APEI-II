import { Aluno } from '../../domain/entities/aluno.entity';

export interface AlunoRepositoryPort {
  salvar(aluno: Aluno): Promise<Aluno>;
  buscarPorId(id: number): Promise<Aluno | null>;
}
