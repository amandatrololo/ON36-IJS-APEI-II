import { Controller, Post, Body, Get, Param, Delete, UseGuards, ParseIntPipe, Patch } from '@nestjs/common';
import { UsuarioService } from "../../application/services/usuario.service";
import { CriarUsuarioDto } from "../../application/dtos/criar-usuario.dto";
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../../auth/jwt.guard';
import { AtualizarUsuarioDto } from '@app/dtos/atualizar-usuario.dto';

@ApiTags('usuarios')
@ApiBearerAuth('access-token')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  
  @Post('criar')
  @UseGuards(RolesGuard)
  @ApiBody( {type: CriarUsuarioDto})
  async criar(@Body() usuarioDto: CriarUsuarioDto) {
    return this.usuarioService.criarUsuario(usuarioDto);
  }  

  // Exibir um usuário específico pelo ID
  @Get(':id')
  async exibirUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.buscarPorId(id);
  }

  // Exibir todos os usuários
  @Get()
  async exibirTodosUsuarios() {
    return this.usuarioService.exibirUsuarios();
  }

  @UseGuards(RolesGuard) // Aplica o Guard que valida o JWT
  @Delete(':id')
  async deletarUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.deletarUsuario(id);
  }

  // Atualizar informações do usuário
  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de usuário(somente para o dono da conta ou coordenador)' })
  @UseGuards(RolesGuard) // Aplica a validação do token JWT
  async atualizarUsuario(@Param('id', ParseIntPipe) id: number, @Body() atualizarUsuarioDto: AtualizarUsuarioDto) {
    return this.usuarioService.atualizarUsuario(id, atualizarUsuarioDto);
  }
  
}
