import { Controller, Post, Get, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { RelatorioProfissionalService } from '../../application/services/relatorio-profissional.service';
import { CriarRelatorioProfissionalDto } from '../../application/dtos/criar-relatorio-profissional.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'auth/jwt.guard';

@ApiTags('relatorios-profissional')
@ApiBearerAuth('access-token')
@Controller('relatorios-profissional')
export class RelatorioProfissionalController {
  constructor(private readonly relatorioProfissionalService: RelatorioProfissionalService) {}

  @UseGuards(RolesGuard)
  @Post('criar')
  @ApiOperation({ summary: 'Criação de relatório profissional (Acesso apenas para profissionais)' })
  async criarRelatorio(@Body() criarRelatorioProfissionalDto: CriarRelatorioProfissionalDto) {
    return this.relatorioProfissionalService.criarRelatorio(criarRelatorioProfissionalDto);
  }

  // Endpoint para visualizar os relatórios profissionais de um aluno - Acesso para coordenador, pai, professor e profissional
  @UseGuards(RolesGuard)
  @Get(':alunoId')
  @ApiOperation({ summary: 'Listar relatórios de um aluno (Acesso restrito)' })
  async listarRelatoriosDoAluno(@Param('alunoId') alunoId: number, @Request() req: any) {
    const usuarioId = req.user?.id; // Extraindo o ID do usuário autenticado do token JWT
    console.log('Usuário autenticado ID:', usuarioId); // Log do ID do usuário para verificação
    return this.relatorioProfissionalService.listarRelatoriosDoAluno(alunoId, usuarioId);
  }

}

