import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatorioProfissional } from '../../domain/entities/relatorio-profissional.entity';
import { RelatorioProfissionalRepositoryPort } from '../../application/ports/relatorio-profissional-repository.port';

@Injectable()
export class RelatorioProfissionalRepository implements RelatorioProfissionalRepositoryPort {
  constructor(
    @InjectRepository(RelatorioProfissional)
    private readonly relatorioProfissionalRepository: Repository<RelatorioProfissional>,
  ) {}
    buscarPorId(id: number): Promise<RelatorioProfissional | undefined> {
        throw new Error('Relatório não encontrado.');
    }

  async salvar(relatorio: RelatorioProfissional): Promise<RelatorioProfissional> {
    return this.relatorioProfissionalRepository.save(relatorio);
  }

  async buscarPorAlunoId(alunoId: number): Promise<RelatorioProfissional[]> {
    return this.relatorioProfissionalRepository.find({ where: { aluno: { id: alunoId } } });
  }
}
