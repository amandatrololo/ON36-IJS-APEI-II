import { RelatorioProfissional } from '../../domain/entities/relatorio-profissional.entity';

export interface RelatorioProfissionalRepositoryPort {
  salvar(relatorio: RelatorioProfissional): Promise<RelatorioProfissional>;
  buscarPorId(id: string): Promise<RelatorioProfissional | undefined>;
}
