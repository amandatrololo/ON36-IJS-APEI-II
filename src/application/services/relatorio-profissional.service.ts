import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatorioProfissional } from '../../domain/entities/relatorio-profissional.entity';
import { CriarRelatorioProfissionalDto } from '../../application/dtos/criar-relatorio-profissional.dto';
import { Aluno } from '../../domain/entities/aluno.entity';
import { Usuario } from '../../domain/entities/usuario.entity';

@Injectable()
export class RelatorioProfissionalService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
    @InjectRepository(RelatorioProfissional)
    private readonly relatorioProfissionalRepository: Repository<RelatorioProfissional>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Método para criar o relatório profissional
  async criarRelatorio(dto: CriarRelatorioProfissionalDto): Promise<RelatorioProfissional> {
    // Verificar se o aluno existe
    const aluno = await this.alunoRepository.findOne({ where: { id: dto.alunoId } });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    // Verificar se o profissional existe
    const profissional = await this.usuarioRepository.findOne({ where: { id: dto.profissionalId } });
    if (!profissional) {
      throw new NotFoundException('Profissional não encontrado.');
    }

    // Criar o relatório profissional associando o aluno e o profissional
    const relatorio = this.relatorioProfissionalRepository.create({
      aluno: aluno, // Passa a entidade de aluno
      cid: dto.cid, // Usa o enum CID para a classificação
      necessidades: dto.necessidades, // Array de necessidades
      profissional: profissional, // Passa a entidade de profissional
      // Add other required properties here
    });

    return this.relatorioProfissionalRepository.save(relatorio);
  }

  // Método para listar os relatórios de um aluno
  async listarRelatoriosDoAluno(alunoId: number, usuarioId: number): Promise<RelatorioProfissional[]> {
    // Buscar o aluno e carregar as relações necessárias (professor, profissional, coordenador)
    const aluno = await this.alunoRepository.findOne({
      where: { id: alunoId },
      relations: ['professor', 'profissional', 'coordenador'],
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    console.log('Professor ID:', aluno.professor?.id);
    console.log('Profissional ID:', aluno.profissional?.id);
    console.log('Coordenador ID:', aluno.coordenador?.id);
    console.log('Usuário autenticado ID:', usuarioId);

    // Verificar se o usuário é o professor, profissional ou coordenador relacionado ao aluno
    if (
      aluno.professor.id !== usuarioId &&
      aluno.profissional?.id !== usuarioId &&
      aluno.coordenador?.id !== usuarioId
    ) {
      throw new ForbiddenException('Você não tem permissão para acessar esses relatórios.');
    }

    // Se o usuário for autorizado, retorna os relatórios relacionados ao aluno
    return this.relatorioProfissionalRepository.find({
      where: { aluno: { id: alunoId } },
      relations: ['aluno', 'profissional'],
    });
  }
}
