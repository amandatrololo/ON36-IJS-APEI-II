import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Aluno } from './aluno.entity';

@Entity('relatorios_progresso')
export class RelatorioProgresso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  progresso: string;

  @Column()
  dificuldades: string;

  @Column({ nullable: true })
  sugestoes: string; 

  @ManyToOne(() => Usuario, (usuario) => usuario.relatoriosProgresso)
  professor: Usuario; 

  @ManyToOne(() => Aluno, (aluno) => aluno.relatoriosProgresso)
  aluno: Aluno; 
}
