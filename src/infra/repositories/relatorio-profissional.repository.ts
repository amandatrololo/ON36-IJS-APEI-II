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
    buscarPorId(id: string): Promise<RelatorioProfissional | undefined> {
        throw new Error('Method not implemented.');
    }

  async salvar(relatorio: RelatorioProfissional): Promise<RelatorioProfissional> {
    return this.relatorioProfissionalRepository.save(relatorio);
  }

  async buscarPorAlunoId(alunoId: string): Promise<RelatorioProfissional[]> {
    return this.relatorioProfissionalRepository.find({ where: { aluno: { id: alunoId } } });
  }
}
