import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Aluno } from './aluno.entity';

@Entity('relatorios_progresso')
export class RelatorioProgresso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  progresso: string; // Avaliação do progresso

  @Column()
  dificuldades: string; // Dificuldades encontradas

  @Column({ nullable: true })
  sugestoes: string; // Sugestões opcionais

  @ManyToOne(() => Usuario, (usuario) => usuario.relatoriosProgresso)
  professor: Usuario; // Apenas o professor pode criar e atualizar o relatório

  @ManyToOne(() => Aluno, (aluno) => aluno.relatoriosProgresso)
  aluno: Aluno; // Aluno relacionado ao relatório
}
