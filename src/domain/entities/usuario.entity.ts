import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Aluno } from './aluno.entity';
import { RelatorioProgresso } from './relatorio-progresso.entity';
import { RelatorioProfissional } from './relatorio-profissional.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'enum', enum: ['COORDENADOR', 'PROFESSOR', 'PROFISSIONAL', 'PAI'] })
  funcao: string;

  // Relações com outras entidades
  @OneToMany(() => Aluno, (aluno) => aluno.coordenador)
  alunosCoordenados: Aluno[];

  @OneToMany(() => Aluno, (aluno) => aluno.professor)
  alunosProfessor: Aluno[];

  @OneToMany(() => Aluno, (aluno) => aluno.profissional)
  alunosProfissional: Aluno[];

  @ManyToOne(() => Aluno, (aluno) => aluno.pais)
  filhos: Aluno[];

  @OneToMany(() => RelatorioProgresso, (relatorio) => relatorio.professor)
  relatoriosProgresso: RelatorioProgresso[];

  @OneToMany(() => RelatorioProfissional, (relatorio) => relatorio.profissional)
  relatoriosProfissional: RelatorioProfissional[];
}
