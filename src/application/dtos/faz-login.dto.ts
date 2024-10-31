import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FazLoginDto {

  @ApiProperty({ description: 'Id do usuário' })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Sua função' })
  funcao: string;
  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email único do usuário, usado para login' })
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Senha do usuário(criado anteriormente)' })
  senha: string; 
}
