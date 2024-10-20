// usuario.controller.ts
import { Controller, Post, Body, Get, Param, Delete , UseGuards} from '@nestjs/common';
import { UsuarioService } from "../../application/services/usuario.service"
import { CriarUsuarioDto } from "../../application/dtos/criar-usuario.dto";
import { ApiTags , ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.guard';

@ApiTags('usuarios')
@ApiBearerAuth('access-token')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('cadastrar')
  @UseGuards(JwtAuthGuard)
  criarUsuario(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usuarioService.criarUsuario(criarUsuarioDto);
  }

  @Get(':id')
  exibirUsuarios(@Param('id') id: string) {
    return this.usuarioService.exibirUsuarios();
  }
  @UseGuards(JwtAuthGuard) // Aplica o Guard que valida o JWT
  @Delete(':id')
  deletarUsuario(@Param('id') id: number) {
    return this.usuarioService.deletarUsuario(id);
  }
}
