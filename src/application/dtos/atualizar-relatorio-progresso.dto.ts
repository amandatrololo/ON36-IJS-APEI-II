import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarRelatorioProgressoDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Avaliação atualizada do progresso do aluno' })
  avaliacao?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Dificuldades atualizadas encontradas pelo aluno' })
  dificuldades?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Sugestões atualizadas para melhoria' })
  sugestoes?: string;
}
