import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { RelatorioProfissionalService } from '../../application/services/relatorio-profissional.service';
import { CriarRelatorioProfissionalDto } from '../../application/dtos/criar-relatorio-profissional.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('relatorios-profissional')
@Controller('relatorios-profissional')
export class RelatorioProfissionalController {
  constructor(private readonly relatorioProfissionalService: RelatorioProfissionalService) {}

  // Endpoint para criar um novo relatório profissional - Apenas profissionais podem criar
  @Post('criar')
  @ApiOperation({ summary: 'Criação de relatório profissional (Acesso apenas para profissionais)' })
  async criarRelatorio(@Body() criarRelatorioProfissionalDto: CriarRelatorioProfissionalDto) {
    return this.relatorioProfissionalService.criarRelatorio(criarRelatorioProfissionalDto);
  }

  // Endpoint para visualizar os relatórios profissionais de um aluno - Acesso para coordenador, pai, professor e profissional
  @Get('aluno/:alunoId')
  @ApiOperation({ summary: 'Listar relatórios profissionais de um aluno (Acesso para coordenador, pai, professor e profissional)' })
  async listarRelatoriosPorAluno(@Param('alunoId') alunoId: string) {
    return this.relatorioProfissionalService.listarRelatoriosDoAluno(alunoId);
  }
}
