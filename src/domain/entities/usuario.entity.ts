// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { RelatorioProgresso } from './relatorio-progresso.entity';
import { Aluno } from './aluno.entity';
import { RelatorioProfissional } from './relatorio-profissional.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column({ type: 'enum', enum: ['COORDENADOR', 'PROFESSOR', 'PROFISSIONAL', 'PAI'] })
  role: string;

   // Coordenador -> pode acessar todos os alunos
   @OneToMany(() => Aluno, (aluno) => aluno.coordenador)
   alunosCoordenados: Aluno[];
 
   // Professor -> Relacionado a vários alunos
   @OneToMany(() => Aluno, (aluno) => aluno.professor)
   alunosProfessor: Aluno[];
 
   // Profissional -> Relacionado a vários alunos
   @OneToMany(() => Aluno, (aluno) => aluno.profissional)
   alunosProfissional: Aluno[];
 
   // Pai -> Relacionado a um único aluno
   @ManyToOne(() => Aluno, (aluno) => aluno.pais)
   filhos: Aluno[];
 
   // Relatórios de progresso e profissional que o usuário pode criar
   @OneToMany(() => RelatorioProgresso, (relatorio) => relatorio.professor)
   relatoriosProgresso: RelatorioProgresso[];
 
   @OneToMany(() => RelatorioProfissional, (relatorio) => relatorio.profissional)
   relatoriosProfissional: RelatorioProfissional[];
 }
