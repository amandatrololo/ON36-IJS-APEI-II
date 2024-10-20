import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../../domain/entities/aluno.entity';
import { AlunoRepositoryPort } from '../../application/ports/aluno-repository.port';

@Injectable()
export class AlunoRepository implements AlunoRepositoryPort {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async salvar(aluno: Aluno): Promise<Aluno> {
    return this.alunoRepository.save(aluno);
  }

  async buscarPorId(id: string): Promise<Aluno | null> {
    return this.alunoRepository.findOne({ where: { id } });
  }

  async deletarAluno(id: string): Promise<void> {
    const aluno = await this.buscarPorId(id);
    if (aluno) {
      await this.alunoRepository.remove(aluno);
    }
  }
}
