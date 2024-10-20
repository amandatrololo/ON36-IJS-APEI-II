import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RelatorioProgressoService } from '../../application/services/relatorio-progresso.service';
import { CriarRelatorioProgressoDto } from '../../application/dtos/criar-relatorio-progresso.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('relatorios-progresso')
@Controller('relatorios-progresso')
export class RelatorioProgressoController {
  constructor(private readonly relatorioProgressoService: RelatorioProgressoService) {}

  @Post('criar')
  async criarRelatorio(@Body() criarRelatorioDto: CriarRelatorioProgressoDto) {
    return this.relatorioProgressoService.criarRelatorio(criarRelatorioDto);
  }

  @Get('aluno/:id')
  async listarRelatoriosDoAluno(@Param('id') alunoId: string) {
    return this.relatorioProgressoService.exibirRelatoriosDoAluno(alunoId);
  }
}
