import { RelatorioProfissional } from '../../domain/entities/relatorio-profissional.entity';

export interface RelatorioProfissionalRepositoryPort {
  salvar(relatorio: RelatorioProfissional): Promise<RelatorioProfissional>;
  buscarPorId(id: number): Promise<RelatorioProfissional | undefined>;
}
