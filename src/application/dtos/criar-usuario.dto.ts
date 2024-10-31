import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CriarUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '[COORDENADOR, PROFESSOR, PROFISSIONAL, PAI]' })
  funcao: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome completo do usuário' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email único do usuário, usado para login' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @ApiProperty({ description: 'Senha do usuário (mínimo de 6 caracteres)' })
  senha: string;
}
