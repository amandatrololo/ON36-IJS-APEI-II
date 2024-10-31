import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AlunoService } from '../../application/services/aluno.service';
import { CriarAlunoDto } from '../../application/dtos/criar-aluno.dto';
import { ApiTags , ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../../auth/jwt.guard';


@ApiTags('alunos')
@ApiBearerAuth('access-token')
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @UseGuards(RolesGuard) // Aplica o Guard que valida o JWT  
  @Post('criar')
  async criarAluno(@Body() criarAlunoDto: CriarAlunoDto) {
   return this.alunoService.criarAluno(criarAlunoDto);
  }

  @Get(':id')
  async buscarAluno(@Param('id') id: number) {
    return this.alunoService.buscarPorId(id);
  }

  @Get()
  async listarAlunos() {
    return this.alunoService.listarAlunos();
  }
}
