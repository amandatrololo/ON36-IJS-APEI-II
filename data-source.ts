// data-source.ts
import { DataSource } from 'typeorm';
import { Usuario } from './src/domain/entities/usuario.entity';
import { Aluno } from './src/domain/entities/aluno.entity';
import { RelatorioProgresso } from './src/domain/entities/relatorio-progresso.entity';
import { RelatorioProfissional } from './src/domain/entities/relatorio-profissional.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/migrations/*.js'],
  synchronize: false,
  migrationsRun: false,
});
