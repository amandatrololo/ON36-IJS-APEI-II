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


  async salvar(relatorio: RelatorioProgresso): Promise<RelatorioProgresso> {
    return this.relatorioProgressoRepository.save(relatorio);
  }

  async buscarPorAlunoId(alunoId: number): Promise<RelatorioProgresso[]> {
    return this.relatorioProgressoRepository.find({ where: { aluno: { id: alunoId } } });
  }


  async buscarPorId(id: number): Promise<RelatorioProgresso | undefined> {
    return this.relatorioProgressoRepository.findOne({ where: { id } });
  }

  async exibirRelatoriosDoAluno(alunoId: number): Promise<RelatorioProgresso[]> {
    return this.relatorioProgressoRepository.find({ where: { aluno: { id: alunoId } } });
  }

  
  async deletarRelatorio(id: number): Promise<void> {
    const relatorio = await this.buscarPorId(id);
    if (relatorio) {
      await this.relatorioProgressoRepository.remove(relatorio);
    } else {
      throw new Error('Relatório não encontrado.');
    }
  }
}
