import { validate , IsString, IsEmail, IsNotEmpty, MinLength, isString  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CriarUsuarioDto {


  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '[COORDENADOR, PROFESSOR, PROFISSIONAL, PAI]' })
  role: string;

  @IsString()
  @IsNotEmpty({message: 'Nome não pode ser vazio'})
  @ApiProperty({ description: 'Nome completo do usuário' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email único do usuário, usado para login' })
  email: string;

  @IsString()
  @MinLength(6, {message: 'Senha deve ter no mínimo 6 caracteres'})
  @ApiProperty({ description: 'Senha do usuário (mínimo de 6 caracteres)' })
  senha: string;
}
