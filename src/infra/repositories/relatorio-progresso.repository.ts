import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatorioProgresso } from '../../domain/entities/relatorio-progresso.entity';
import { RelatorioProgressoRepositoryPort } from '../../application/ports/relatorio-progresso-repository.port';

@Injectable()
export class RelatorioProgressoRepository implements RelatorioProgressoRepositoryPort {
  constructor(
    @InjectRepository(RelatorioProgresso)
    private readonly relatorioProgressoRepository: Repository<RelatorioProgresso>,
  ) {}

  // Salvar relatório
  async salvar(relatorio: RelatorioProgresso): Promise<RelatorioProgresso> {
    return this.relatorioProgressoRepository.save(relatorio);
  }

  // Buscar relatório por alunoId
  async buscarPorAlunoId(alunoId: string): Promise<RelatorioProgresso[]> {
    return this.relatorioProgressoRepository.find({ where: { aluno: { id: alunoId } } });
  }

  // Buscar relatório por Id
  async buscarPorId(id: number): Promise<RelatorioProgresso | undefined> {
    return this.relatorioProgressoRepository.findOne({ where: { id } });
  }

  // Exibir relatórios de um aluno
  async exibirRelatoriosDoAluno(alunoId: string): Promise<RelatorioProgresso[]> {
    return this.relatorioProgressoRepository.find({ where: { aluno: { id: alunoId } } });
  }

  // Deletar relatório
  async deletarRelatorio(id: number): Promise<void> {
    const relatorio = await this.buscarPorId(id);
    if (relatorio) {
      await this.relatorioProgressoRepository.remove(relatorio);
    } else {
      throw new Error('Relatório não encontrado.');
    }
  }
}
