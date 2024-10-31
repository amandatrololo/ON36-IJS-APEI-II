import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarRelatorioProgressoDto {

  @IsString()
  @ApiProperty({ description: 'Usuário que está preenchendo o relatório' })
  usuario?: string; 

  @IsNotEmpty()
  @ApiProperty({ description: 'ID do aluno para o qual o relatório está sendo gerado' })
  alunoId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Avaliação do progresso do aluno' })
  progresso: string;

  @IsString()
  @IsNotEmpty() 
  @ApiProperty({ description: 'Dificuldades encontradas pelo aluno' })
  dificuldades: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Sugestões de melhoria para o aluno' })
  sugestoes?: string; 
}
