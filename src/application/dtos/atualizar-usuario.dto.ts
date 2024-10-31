import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarUsuarioDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Nome completo do usuário' })
  nome?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'Email único do usuário' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Nova senha do usuário' })
  senha?: string;
}
