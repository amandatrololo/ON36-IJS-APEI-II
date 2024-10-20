import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarRelatorioProgressoDto {

  @IsString()
  @ApiProperty({ description: 'Usuário que está preenchendo o relatório' })
  usuario?: string; // Marcado como opcional no DTO

  @IsNotEmpty()
  @ApiProperty({ description: 'ID do aluno para o qual o relatório está sendo gerado' })
  alunoId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Avaliação do progresso do aluno' })
  progresso: string;

  @IsString()
  @IsNotEmpty() // Mantido como obrigatório
  @ApiProperty({ description: 'Dificuldades encontradas pelo aluno' })
  dificuldades: string; // Removi o `?` para deixar obrigatório

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Sugestões de melhoria para o aluno' })
  sugestoes?: string; // Este campo é opcional
}
