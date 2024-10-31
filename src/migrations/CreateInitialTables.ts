import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`
      CREATE TABLE usuario (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        nome varchar(256) NOT NULL,
        email varchar(256) NOT NULL,
        senha varchar(256) NOT NULL,
        CONSTRAINT usuario_pk PRIMARY KEY (id),
        CONSTRAINT usuario_un_email UNIQUE (email)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE aluno (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        nome varchar(256) NOT NULL,
        data_nascimento date NOT NULL,
        usuario_id uuid,
        CONSTRAINT aluno_pk PRIMARY KEY (id),
        CONSTRAINT aluno_fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE relatorio_progresso (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        descricao text NOT NULL,
        data date NOT NULL,
        aluno_id uuid,
        CONSTRAINT relatorio_progresso_pk PRIMARY KEY (id),
        CONSTRAINT relatorio_progresso_fk_aluno FOREIGN KEY (aluno_id) REFERENCES aluno(id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE relatorio_profissional (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        descricao text NOT NULL,
        data date NOT NULL,
        aluno_id uuid,
        CONSTRAINT relatorio_profissional_pk PRIMARY KEY (id),
        CONSTRAINT relatorio_profissional_fk_aluno FOREIGN KEY (aluno_id) REFERENCES aluno(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS relatorio_profissional;`);
    await queryRunner.query(`DROP TABLE IF EXISTS relatorio_progresso;`);
    await queryRunner.query(`DROP TABLE IF EXISTS aluno;`);
    await queryRunner.query(`DROP TABLE IF EXISTS usuario;`);
  }
}
