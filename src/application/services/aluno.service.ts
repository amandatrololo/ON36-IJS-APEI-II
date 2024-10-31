import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../../domain/entities/aluno.entity';
import { CriarAlunoDto } from '../dtos/criar-aluno.dto';
import { Usuario } from '../../domain/entities/usuario.entity';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Para verificar o coordenador
  ) {}

  async criarAluno(dto: CriarAlunoDto): Promise<Aluno> {
    // Verificar se o coordenador existe
    const coordenador = await this.usuarioRepository.findOne({ where: { id: dto.coordenadorId, funcao: 'COORDENADOR' } });
    if (!coordenador) {
      throw new NotFoundException('Coordenador não encontrado');
    }
  
    const professor = await this.usuarioRepository.findOne({ where: { id: dto.professorId, funcao: 'PROFESSOR' } });
    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }
  
    const profissional = await this.usuarioRepository.findOne({ where: { id: dto.profissionalId, funcao: 'PROFISSIONAL' } });
    if (!profissional) {
      throw new NotFoundException('Profissional não encontrado');
    }
  
    const pais = await this.usuarioRepository.findOne({ where: { id: dto.paiId, funcao: 'PAI' } });
    if (!pais) {
      throw new NotFoundException('Pais não encontrados');
    }
  
    // Criar um novo aluno
    const novoAluno = this.alunoRepository.create({
      nome: dto.nome,
      coordenador: coordenador,
      professor: professor,
      profissional: profissional,
      pais: pais
    });
  
    return this.alunoRepository.save(novoAluno);
  }
  

  // Listagem de todos os alunos com as relações associadas
  async listarAlunos(): Promise<Aluno[]> {
    return await this.alunoRepository.find({
      relations: ['coordenador', 'professor', 'profissional', 'pais', 'relatoriosProgresso'],
    });
  }

  // Buscar um aluno pelo ID (id como number)
  async buscarPorId(id: number): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({
      where: { id },
      relations: ['coordenador', 'professor', 'profissional', 'pais', 'relatoriosProgresso'],
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    return aluno;
  }
  

  // Atualizar informações do aluno (id como number)
  async atualizarAluno(id: number, atualizarAlunoDto: Partial<CriarAlunoDto>): Promise<Aluno> {
    const aluno = await this.buscarPorId(id);
    Object.assign(aluno, atualizarAlunoDto); 
    return await this.alunoRepository.save(aluno);
  }

  // Deletar aluno (id como number)
  async deletarAluno(id: number): Promise<void> {
    const aluno = await this.buscarPorId(id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    await this.alunoRepository.remove(aluno);
  }
}
