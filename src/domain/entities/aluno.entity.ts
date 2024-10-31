// aluno.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany , ManyToOne } from 'typeorm';
import { RelatorioProgresso } from './relatorio-progresso.entity';
import { RelatorioProfissional } from './relatorio-profissional.entity';
import { Usuario } from './usuario.entity';

@Entity('alunos')
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => RelatorioProgresso, (relatorio) => relatorio.aluno)
  relatoriosProgresso: RelatorioProgresso[];

  @ManyToOne(() => Usuario, (usuario) => usuario.alunosCoordenados, { nullable: false })
  coordenador: Usuario;  // Relacionamento com o coordenador

  @OneToMany(() => RelatorioProfissional, (relatorioProfissional) => relatorioProfissional.aluno)
  relatoriosProfissionais: RelatorioProfissional[];

  // Relaciona o aluno a um professor
  @ManyToOne(() => Usuario, (usuario) => usuario.alunosProfessor, { nullable: false })
  professor: Usuario;

  // Relaciona o aluno a um profissional
  @ManyToOne(() => Usuario, (usuario) => usuario.alunosProfissional, { nullable: false })
  profissional: Usuario;

  // Relaciona o aluno aos pais
  @ManyToOne(() => Usuario, (usuario) => usuario.filhos, { nullable: false })
  pais: Usuario;
}
