import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum CidTranstornosMentais {
  F90 = 'F90 - Transtornos hipercinéticos',
  F84 = 'F84 - Transtornos globais do desenvolvimento',
  F32 = 'F32 - Episódios depressivos',
  F93 = 'F93 - Transtornos emocionais com início específico na infância',
  F94 = 'F94 - Transtornos de funcionamento social específicos da infância',
  F98 = 'F98 - Outros transtornos comportamentais e emocionais com início na infância e adolescência',
  F41 = 'F41 - Outros transtornos ansiosos'
}

class Necessidade {
  @IsString()
  @ApiProperty({ description: 'Observações sobre a habilidade' })
  observacao: string;
}

export class CriarRelatorioProfissionalDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do aluno para o qual o relatório está sendo gerado' })
  alunoId: number;

    // Use a enum para o campo CID e defina-a no ApiProperty
  @IsEnum(CidTranstornosMentais)
  @ApiProperty({ enum: CidTranstornosMentais, description: 'Código CID (Classificação Internacional de Doenças)' })
  cid: CidTranstornosMentais;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'Código CID (Classificação Internacional de Doenças)' })
  // cid: string;

// @ApiBody({ type: [cidDto] })
// createBulk(@Body() cidDto: CriarCidDto[])

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Necessidade)
  @ApiProperty({
    description: 'Lista de necessidades específicas do aluno',
    type: () => [Necessidade],
  })
  necessidades: Necessidade[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do profissional que está criando o relatório' })
  profissionalId: number;  // Adiciona profissionalId no DTO
}
