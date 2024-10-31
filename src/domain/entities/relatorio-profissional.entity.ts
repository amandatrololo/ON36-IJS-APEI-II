import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluno } from './aluno.entity';
import { Usuario } from './usuario.entity';

@Entity('relatorios_profissionais')
export class RelatorioProfissional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cid: string; // Define o campo 'cid' corretamente

  @ManyToOne(() => Aluno, (aluno) => aluno.relatoriosProfissionais, { eager: true })
  aluno: Aluno;

  @Column({ type: 'jsonb' })
  necessidades: { habilidade: string; status: string; observacao: string }[]; 

  @ManyToOne(() => Usuario, (usuario) => usuario.relatoriosProfissional, { eager: true })
  profissional: Usuario;  // Relaciona ao profissional que criou o relatório
}
