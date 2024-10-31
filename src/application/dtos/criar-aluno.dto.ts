import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';


export class CriarAlunoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome completo do aluno' })
  nome: string;
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do coordenador responsável pelo aluno' })
  coordenadorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do professor responsável pelo aluno' })
  professorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do profissional responsável pelo aluno' })
  profissionalId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do pai ou responsável pelo aluno' })
  paiId: number;
}
