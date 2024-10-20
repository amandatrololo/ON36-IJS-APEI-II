// relatorio-profissional.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluno } from './aluno.entity';
import { Usuario } from './usuario.entity';

@Entity('relatorios_profissionais')
export class RelatorioProfissional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cid: string;

  @ManyToOne(() => Aluno, (aluno) => aluno.relatoriosProfissionais)
  aluno: Aluno;

  @Column({ type: 'jsonb' })
  necessidades: { habilidade: string; status: string; observacao: string }[];

  @ManyToOne(() => Usuario, (usuario) => usuario.relatoriosProfissional)
  profissional: Usuario;  // Apenas o profissional pode criar o relatório
}
