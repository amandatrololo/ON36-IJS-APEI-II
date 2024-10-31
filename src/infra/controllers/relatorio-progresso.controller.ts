import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { RelatorioProgressoService } from '../../application/services/relatorio-progresso.service';
import { CriarRelatorioProgressoDto } from '../../application/dtos/criar-relatorio-progresso.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'auth/jwt.guard';

@ApiTags('relatorios-progresso')
@ApiBearerAuth('access-token')
@Controller('relatorios-progresso')
export class RelatorioProgressoController {
  constructor(private readonly relatorioProgressoService: RelatorioProgressoService) {}

  @UseGuards(RolesGuard)
  @Post('criar')
  async criarRelatorio(@Body() criarRelatorioDto: CriarRelatorioProgressoDto) {
    return this.relatorioProgressoService.criarRelatorio(criarRelatorioDto);
  }

  @UseGuards(RolesGuard)
  @Get('aluno/:id')
  async listarRelatoriosDoAluno(@Param('id') alunoId: number) {
    return this.relatorioProgressoService.exibirRelatoriosDoAluno(alunoId);
  }

  // @Patch(':id')
  // @UseGuards(RolesGuard)
  // @ApiOperation({ summary: 'Atualização de relatorio(somente para o dono da conta ou coordenador)' })
  // @UseGuards(RolesGuard) // Aplica a validação do token JWT
  // async atualizarRelatorioProfissional(@Param('id', ParseIntPipe) id: number, @Body() atualizarUsuarioDto: AtualizarUsuarioDto) {
  //   return this.usuarioService.atualizarUsuario(id, AtualizarRelatorioProgressoDto);
  // }
}
