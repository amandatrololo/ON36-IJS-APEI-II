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
import { AuthService } from './auth/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@infra/controllers/jwt.controller';

@Module({
  imports: [
    // Configura o uso do .env
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prd' : '.env.dev',
      isGlobal: true,
    }),    
    JwtModule.register({
      secret: process.env.JWT_SECRET_HML || 'c00rd3n4c40secr3t43sc0l4',  // Chave secreta para assinar o token
      signOptions: { expiresIn: '12h' }, // Definir tempo de expiração do token
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',  // Em desenvolvimento, true. Em produção, use migrations.
      migrationsRun: process.env.NODE_ENV === 'production', // Em produção, true para rodar migrações automaticamente.
      migrations: ['dist/migrations/*.js'],  // Diretório de migrações
    }),    
    TypeOrmModule.forFeature([Usuario, Aluno, RelatorioProgresso, RelatorioProfissional]),
  ],
  controllers: [AuthController, AlunoController, UsuarioController, RelatorioProgressoController, RelatorioProfissionalController],
  providers: [AuthService, UsuarioService, AlunoService, RelatorioProgressoService, RelatorioProfissionalService],
  exports: [JwtModule],
})
export class AppModule {}
