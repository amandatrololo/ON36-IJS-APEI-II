*Projeto FINAL: Projeto A.P.E.I - "Apoio Pedagógico à Educação Inclusiva"*

*Descrição:*
"Apoio Pedagógico à Educação Inclusiva"* - Este projeto será voltado para auxiliar professores e escolas no acompanhamento de alunos com necessidades educativas especiais. O objetivo é promover a inclusão e garantir que esses alunos tenham o suporte necessário para atingir seu potencial.
Eu, como pessoa com deficiência (sou surda bilateral), sempre tive certas habilidades não desenvolvidas na escola regular. Por exemplo, atividades educativas que estimulassem minhas outras habilidades sensoriais, atividades de comunicação oral e até atividades inclusivas nas quais os alunos soubessem como conversar com uma pessoa surda (deixar os lábios à vista, para chamar precisa encostar no ombro, etc.).
Essa ideia é para auxiliar as pessoas educadoras a implementar atividades inclusivas nos períodos escolares, de forma que os alunos possam se integrar naturalmente.

*Descrição Técnica:*
O APEI API é uma API desenvolvida com NestJS que facilita o gerenciamento de alunos e relatórios de progresso e profissionais. A API foi construída com uma arquitetura hexagonal, banco de dados PostgreSQL e está preparada para deploy na AWS com autenticação JWT.

*Tabela Relacional* 

             +--------------------+                      +--------------------+
             |         DB         |                      |      REST API      |
             +--------------------+                      +--------------------+
                     |                                               |
                     v                                               v
             +---------------------------------------------------------------+
             |                          Portas                               |
             |---------------------------------------------------------------|
             |  - aluno-repository.port.ts                                    |
             |  - usuario-repository.port.ts                                  |
             |  - relatorio-progresso-repository.port.ts                      |
             |  - relatorio-profissional-repository.port.ts                   |
             +---------------------------------------------------------------+
                     |                        |                        |
                     v                        v                        v
+-------------------------------------------------------------------------------------------+
|                                       Núcleo (Domínio)                                    |
|-------------------------------------------------------------------------------------------|
|  - Entities:                                                                              |
|     - aluno.entity.ts                                                                     |
|         |-- (OneToMany) -> usuario.entity.ts (coordenador)                                |
|         |-- (ManyToOne) -> usuario.entity.ts (professor, pai, profissional)               |
|     - relatorio-progresso.entity.ts                                                       |
|         |-- (ManyToOne) -> usuario.entity.ts (professor)                                  |
|         |-- (ManyToOne) -> aluno.entity.ts                                                |
|     - relatorio-profissional.entity.ts                                                    |
|         |-- (ManyToOne) -> usuario.entity.ts (profissional)                               |
|         |-- (ManyToOne) -> aluno.entity.ts                                                |
|                                                                                           |
|  - Enums (role.enum.ts):                                                                  |
|     - 'COORDENADOR', 'PROFESSOR', 'PROFISSIONAL', 'PAI'                                   |
+-------------------------------------------------------------------------------------------+
                     |                        |                        |
                     v                        v                        v
             +---------------------------------------------------------------+
             |                       Adaptadores                             |
             |---------------------------------------------------------------|
             |  Controllers:                                                 |
             |     - aluno.controller.ts                                     |
             |         |-- (Uses) -> aluno.service.ts                        |
             |     - usuario.controller.ts                                   |
             |         |-- (Uses) -> usuario.service.ts                      |
             |     - relatorio-progresso.controller.ts                       |
             |         |-- (Uses) -> relatorio-progresso.service.ts          |
             |     - relatorio-profissional.controller.ts                    |
             |         |-- (Uses) -> relatorio-profissional.service.ts       |
             |                                                               |
             |  Services:                                                    |
             |     - aluno.service.ts                                        |
             |         |-- (Injects) -> aluno.repository.ts                  |
             |     - usuario.service.ts                                      |
             |         |-- (Injects) -> usuario.repository.ts                |
             |     - relatorio-progresso.service.ts                          |
             |         |-- (Injects) -> relatorio-progresso.repository.ts    |
             |     - relatorio-profissional.service.ts                       |
             |         |-- (Injects) -> relatorio-profissional.repository.ts |
             |                                                               |
             |  Repositories:                                                |
             |     - aluno.repository.ts                                     |
             |         |-- (Extends) -> aluno-repository.port.ts             |
             |     - usuario.repository.ts                                   |
             |         |-- (Extends) -> usuario-repository.port.ts           |
             |     - relatorio-progresso.repository.ts                       |
             |         |-- (Extends) -> relatorio-progresso-repository.port.ts|
             |     - relatorio-profissional.repository.ts                    |
             |         |-- (Extends) -> relatorio-profissional-repository.port.ts|
             |                                                               |
             |  DTOs:                                                        |
             |     - criar-aluno.dto.ts                                      |
             |         |-- (Used By) -> aluno.service.ts                     |
             |     - criar-usuario.dto.ts                                    |
             |         |-- (Used By) -> usuario.service.ts                   |
             |     - criar-relatorio-progresso.dto.ts                        |
             |         |-- (Used By) -> relatorio-progresso.service.ts       |
             |     - criar-relatorio-profissional.dto.ts                     |
             |         |-- (Used By) -> relatorio-profissional.service.ts    |
             +---------------------------------------------------------------+
Relações:
Aluno:

Relacionado a Usuario: Um aluno pode estar associado a um coordenador, professor, profissional e pai.
Relacionado a Relatórios: Um aluno está associado a vários relatórios de progresso e profissionais.
Relatório de Progresso:

Relacionado a Aluno: Cada relatório de progresso é vinculado a um aluno.
Relacionado a Professor: Um professor pode criar relatórios de progresso para seus alunos.
Relatório Profissional:

Relacionado a Aluno: Cada relatório profissional é vinculado a um aluno.
Relacionado a Profissional: Um profissional pode criar relatórios profissionais para seus alunos.
Portas e Adaptadores:
Portas: Declaração das interfaces de repositórios (ports) que conectam o núcleo da aplicação ao sistema externo (DB).
Adaptadores: Implementação dos serviços, controladores, e repositórios, que conectam as portas ao resto do sistema (API REST e DB).

_Tecnologias Utilizadas_
`Node.js com NestJS
PostgreSQL como banco de dados
TypeORM como ORM
Swagger para documentação
JWT para autenticação
Docker (opcional) para empacotamento da aplicação `

_Funcionalidades_
- Usuário Coordenador:
Pode criar, atualizar e deletar usuários (professores, profissionais e pais).
Pode criar, atualizar e deletar alunos e vinculá-los a professores, profissionais e pais.
Pode acessar todos os relatórios.
- Professor:
Pode criar e atualizar relatórios de progresso de alunos vinculados.
Profissional:
Pode criar relatórios profissionais de alunos vinculados.
- Pais:
Podem visualizar os relatórios (progresso e profissional) do aluno vinculado.
- Instalação e Configuração Local
Pré-requisitos
Node.js (v16+)
PostgreSQL (Banco de Dados)
Docker (opcional, se optar por containerização)
Conta AWS (para deploy)
Passo a Passo de Instalação
Clone o repositório do GitHub:


git clone https://github.com/seu-usuario/on36-ijs-apei-ii.git
cd on36-ijs-apei-ii
Instale as dependências:

npm install
Configure o banco de dados PostgreSQL e crie um arquivo .env ou .env.dev na raiz do projeto com as seguintes variáveis:


` DB_HOST=localhost
DB_PORT=5050
DB_USER=postgres
DB_PASS=canetinha*2023
DB_NAME=apei-database-prd
JWT_SECRET_PRD=19102024 `




npm run typeorm migration:run
Rodar a aplicação localmente:



npm run start
Acesse a aplicação:

A API estará rodando em: http://localhost:3000
Acesse a documentação do Swagger: http://localhost:3000/api