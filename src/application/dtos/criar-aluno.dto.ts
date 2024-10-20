import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';


export class CriarAlunoDto {

  @ApiProperty({ description: 'ID do coordenador que está cadastrando o aluno' })
  coordenadorId: string;

 
  @ApiProperty({ description: 'ID do professor relacionado ao aluno' })
  professorId: string;

 
  @ApiProperty({ description: 'ID do profissional relacionado ao aluno' })
  profissionalId: string;

  @ApiProperty({ description: 'ID do pai relacionado ao aluno' })
  paiId: string;

  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID do aluno, composto por 8 dígitos' })
  alunoId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome completo do aluno' })
  nome: string;
}
