import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatorioProgresso } from '../../domain/entities/relatorio-progresso.entity';
import { CriarRelatorioProgressoDto } from '../../application/dtos/criar-relatorio-progresso.dto';
import { Usuario } from '../../domain/entities/usuario.entity';
import { Aluno } from '../../domain/entities/aluno.entity'; // Mudança aqui
@Injectable()
export class RelatorioProgressoService {
  constructor(
    @InjectRepository(RelatorioProgresso)
    private readonly relatorioProgressoRepository: Repository<RelatorioProgresso>,
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>, // Mudança aqui
  ) {}


  async criarRelatorio(dto: CriarRelatorioProgressoDto): Promise<RelatorioProgresso> {
    // Busque o aluno pelo ID fornecido no DTO
    const aluno = await this.alunoRepository.findOne({ where: { id: dto.alunoId } });
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    // Cria o relatório com os dados corretos
    const relatorio = this.relatorioProgressoRepository.create({
      aluno: aluno, // Aqui é a entidade aluno, e não apenas o ID
      progresso: dto.progresso,
      dificuldades: dto.dificuldades,
      sugestoes: dto.sugestoes,
    });

    // Salva o relatório no banco de dados
    return this.relatorioProgressoRepository.save(relatorio);
  }

  async exibirRelatoriosDoAluno(alunoId: number): Promise<RelatorioProgresso[]> {
    return this.relatorioProgressoRepository.find({ where: { aluno: { id: alunoId } } });
  }
}
