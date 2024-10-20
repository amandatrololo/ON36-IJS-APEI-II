import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Necessidade {
  @IsString()
  @ApiProperty({ description: 'Observações sobre a habilidade' })
  observacao: string;
}

export class CriarRelatorioProfissionalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do aluno para o qual o relatório está sendo gerado' })
  alunoId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Código CID (Classificação Internacional de Doenças)' })
  cid: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Necessidade)
  @ApiProperty({ description: 'Lista de necessidades específicas do aluno', type: () => [Necessidade] })
  necessidades: Necessidade[];
}