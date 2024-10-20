import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './domain/entities/usuario.entity';
import { Aluno } from './domain/entities/aluno.entity';
import { RelatorioProgresso } from './domain/entities/relatorio-progresso.entity';
import { RelatorioProfissional } from './domain/entities/relatorio-profissional.entity';
import { ConfigModule } from '@nestjs/config';
import { AlunoController } from '@infra/controllers/aluno.controller';
import { UsuarioController } from '@infra/controllers/usuario.controller';
import { RelatorioProgressoController } from '@infra/controllers/relatorio-progresso.controller';
import { RelatorioProfissionalController } from '@infra/controllers/relatorio-profissional.controller';
import { UsuarioService } from './application/services/usuario.service';
import { AlunoService } from './application/services/aluno.service';
import { RelatorioProgressoService } from './application/services/relatorio-progresso.service';
import { RelatorioProfissionalService } from './application/services/relatorio-profissional.service';
import { AuthService } from './auth/jwt.service'; // Corrigir o caminho para o AuthService
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Configura o uso do .env
    ConfigModule.forRoot({
      envFilePath: '.env.dev', // Aqui você pode especificar o arquivo .env que deseja usar
      isGlobal: true, // Disponibiliza as variáveis de ambiente globalmente
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_HML || '19102024',  // Chave secreta para assinar o token
      signOptions: { expiresIn: '12h' }, // Definir tempo de expiração do token
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Para desenvolvimento, true. Em produção, use migrations.
    }),
    TypeOrmModule.forFeature([Usuario, Aluno, RelatorioProgresso, RelatorioProfissional]),
  ],
  controllers: [AlunoController, UsuarioController, RelatorioProgressoController, RelatorioProfissionalController],
  providers: [AuthService, UsuarioService, AlunoService, RelatorioProgressoService, RelatorioProfissionalService],
  exports: [JwtModule],
})
export class AppModule {}
