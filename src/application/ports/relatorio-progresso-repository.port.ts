import { RelatorioProgresso } from '../../domain/entities/relatorio-progresso.entity';

export interface RelatorioProgressoRepositoryPort {
  salvar(relatorio: RelatorioProgresso): Promise<RelatorioProgresso>;
  buscarPorId(id: number ): Promise<RelatorioProgresso | undefined>;
  exibirRelatoriosDoAluno(alunoId: string): Promise<RelatorioProgresso[]>;
  deletarRelatorio(id: number ): Promise<void>;
}
