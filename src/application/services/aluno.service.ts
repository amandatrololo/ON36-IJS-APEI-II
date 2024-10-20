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
    const coordenador = await this.usuarioRepository.findOne({ where: { id: 19102024 , role: 'COORDENADOR' } })
    if (!coordenador) {
      throw new NotFoundException('Coordenador não encontrado');
    }
  
    // Criar um novo aluno com as informações fornecidas no DTO
    const novoAluno = this.alunoRepository.create({
      nome: dto.nome,   // Acessar as propriedades do dto corretamente
      coordenador: coordenador, // Relaciona o aluno ao coordenador
    });
  
    // Salvar o novo aluno no banco de dados
    return this.alunoRepository.save(novoAluno);
  }

  // Listagem de todos os alunos
  async listarAlunos(): Promise<Aluno[]> {
    return await this.alunoRepository.find();
  }

  // Buscar um aluno pelo ID
  async buscarPorId(id: string): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({ where: { id } });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    return aluno;
  }

  // Atualizar informações do aluno
  async atualizarAluno(id: string, atualizarAlunoDto: Partial<CriarAlunoDto>): Promise<Aluno> {
    const aluno = await this.buscarPorId(id);

    Object.assign(aluno, atualizarAlunoDto); // Atualiza as propriedades do aluno
    return await this.alunoRepository.save(aluno);
  }

  // Deletar aluno
  async deletarAluno(id: string): Promise<void> {
    const aluno = await this.buscarPorId(id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    await this.alunoRepository.remove(aluno);
  }
}
