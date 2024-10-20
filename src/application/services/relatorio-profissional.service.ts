import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatorioProfissional } from '../../domain/entities/relatorio-profissional.entity';
import { CriarRelatorioProfissionalDto } from '../../application/dtos/criar-relatorio-profissional.dto';

@Injectable()
export class RelatorioProfissionalService {
  constructor(
    @InjectRepository(RelatorioProfissional)
    private readonly relatorioProfissionalRepository: Repository<RelatorioProfissional>,
  ) {}

  async criarRelatorio(dto: CriarRelatorioProfissionalDto): Promise<RelatorioProfissional> {
    const relatorio = this.relatorioProfissionalRepository.create({
      aluno: { id: dto.alunoId }, // Associa o aluno pelo ID
      cid: dto.cid, // Código CID
      necessidades: dto.necessidades, // Array de necessidades
    });

    return this.relatorioProfissionalRepository.save(relatorio);
  }

  async listarRelatoriosDoAluno(alunoId: string): Promise<RelatorioProfissional[]> {
    return this.relatorioProfissionalRepository.find({
      where: { aluno: { id: alunoId } },
      relations: ['aluno', 'profissional'],
    });
  }
}
