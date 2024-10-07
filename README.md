<p align="center">
  <img src="./docs/cover.png" alt="Dinamiques" />
  <hr>
  <h1 align="center">Dinamiques: conhecimento ao alcance de todos</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/FelipeCourse/dinamiques-api-nest?style=for-the-badge&color=4e5acf" alt="Repo size" />
  <a aria-label="Last Commit" href="https://github.com/FelipeCourse/dinamiques-api-nest/commits/main">
    <img src="https://img.shields.io/github/last-commit/FelipeCourse/dinamiques-api-nest?style=for-the-badge&color=4e5acf" alt="Last commit on GitHub" />
  </a>
  <!-- <img src="https://img.shields.io/badge/license-MIT-4e5acf?style=for-the-badge" alt="License" /> -->
  <img src="https://img.shields.io/badge/status-concluído-green?style=for-the-badge" alt="Status" />
</p>

<br>

<p align="center">
  <a target="_blank" href="https://www.docker.com/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=orange&label=Docker&message=Build&logo=docker" alt="Docker" />
  </a>
    <a target="_blank" href="https://docs.github.com/pt/actions">
    <img src="https://img.shields.io/static/v1?style=plastic&color=orange&label=CI/CD&message=Build&logo=githubactions" alt="CI/CD: GitHub Actions" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/git-commit-msg-linter">
    <img src="https://img.shields.io/static/v1?style=plastic&color=orange&l&label=GitCommitMsgLinter&message=Build" alt="GitCommitMsgLinter" />
  </a>
  <a target="_blank" href="https://github.com/lint-staged/lint-staged">
    <img src="https://img.shields.io/static/v1?style=plastic&color=orange&l&label=LintStaged&message=Build" alt="LintStaged" />
  </a>
  <a target="_blank" href="https://typicode.github.io/husky/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=orange&l&label=Husky&message=Build" alt="Husky" />
  </a>
</p>
<p align="center">
  <a target="_blank" href="https://nestjs.com/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&logoColor=red&label=Nestjs&message=TS&logo=Nestjs" alt="Nest.js" />
  </a>
  <a target="_blank" href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Typescript&message=TS&logo=typescript" alt="Typescript.org" />
  </a>
  <a target="_blank" href="https://jwt.io">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=JWT&message=TS&" alt="JWT.io" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/bcryptjs">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Bcryptjs&message=TS&" alt="Bcryptjs" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/uuid">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=UUID&message= &" alt="UUID" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/class-transformer/v/0.1.0-beta.10">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=ClassTransformer&message=TS" alt="ClassTransformer" />
  </a>
  <a target="_blank" href="https://github.com/typestack/class-validator">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=ClassValidator&message=TS" alt="ClassValidator" />
  </a>
  <a target="_blank" href="https://eslint.org/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&logoColor=red&label=ESLint&message=JS&logo=eslint" alt="Eslint.org" />
  </a>
  <a target="_blank" href="https://prettier.io/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&l&label=Prettier&message=TS&logo=prettier" alt="Prettier.io" />
  </a>
  <a target="_blank" href="https://jestjs.io/pt-BR/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&logoColor=red&label=Jest&message=TS&logo=jest" alt="Jest.io" />
  </a>
  <a target="_blank" href="https://fakerjs.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&l&label=Fakerjs&message=TS" alt="Fakerjs.dev" />
  </a>
</p>
<p align="center">
  <a target="_blank" href="https://www.prisma.io/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=yellow&label=Prisma&message=ORM&logo=prisma" alt="Prisma.io" />
  </a>
</p>
<p align="center">
  <a target="_blank" href="https://swagger.io/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=blue&label=Swagger&message=DOC&logo=swagger" alt="Swagger.io" />
  </a>
</p>

## Índice

<ol>
  <li><a href="#sobre">Sobre</a></li>
  <li><a href="#funcionalidades">Funcionalidades</a></li>
  <li><a href="#arquitetura">Arquitetura</a></li>
  <li><a href="#cicd">CI/CD</a></li>
  <li><a href="#como-executar">Como executar</a></li>
  <li><a href="#tecnologias">Tecnologias</a></li>
  <li><a href="#autor">Autor</a></li>
</ol>

## Sobre

API desenvolvida em NestJS que gerencia recursos para um blog acadêmico.

## Funcionalidades

> **IMPORTANTE !**
>
> - Nessa primeira versão não foi implementado o conceito de _roles_ para restringir acessos e definir permissões, porém posteriormente será implementado.
> - Os itens abaixo sem a marcação de checado são recursos que estão mapeados para serem implementados posteriormente.

- [x] Usuário poderá se autenticar quando estiver com o status ativo

- [x] Usuário autenticado poderá gerenciar:
  - Usuários
    - [x] Criar
      - [x] Com restrição de `email` e `username` únicos
    - [x] Consultar todos
      - [x] Com paginação e limite de itens
      - [ ] Ordenar por padrão em ordem decrescente de criação
      - [ ] Adicionar filtro para ordenação
    - [x] Consultar por id
    - [ ] Consultar por email
    - [x] Editar
      - [x] Com restrição de `email` e `username` únicos
    - [x] Deletar
      - [x] Do tipo `soft delete` para se manter histórico
      - [x] Não é possível deletar ( desativar ) um usuário já desativado
  - Docentes
    - [x] Criar
      - [x] Com restrição de `nome` único
    - [x] Consultar todos
      - [x] Com paginação e limite de itens
      - [ ] Ordenar por padrão em ordem decrescente de criação
      - [ ] Adicionar filtro para ordenação
    - [x] Consultar por id
    - [ ] Consultar por nome
    - [x] Editar
      - [x] Com restrição de `nome` único
    - [x] Deletar
      - [x] É feita automaticamente a desativação do seu usuário correspondente
  - Categorias
    - [x] Criar
      - [x] Com restrição de `nome` único
    - [x] Consultar todas
      - [x] Com paginação e limite de itens
      - [ ] Ordenar por padrão em ordem decrescente de criação
      - [ ] Adicionar filtro para ordenação
    - [x] Consultar por id
    - [ ] Consultar por nome
    - [x] Editar
      - [x] Com restrição de `nome` único
    - [x] Deletar
      - [x] Com restrição de somente se não estiver associada em artigo(s)
  - Artigos
    - [x] Criar
      - [x] Com restrição de `título` e `slug` únicos
    - [x] Consultar todos
      - [x] Com paginação e limite de itens
      - [ ] Ordenar por padrão em ordem decrescente de publicação
      - [ ] Adicionar filtro para ordenação
    - [ ] Consultar todos e concatenar com dados do docente e categoria
    - [x] Consultar por id
    - [ ] Consultar por id e concatenar com dados do docente e categoria
    - [x] Consultar por termo em título ou conteúdo
    - [x] Editar
      - [x] Com restrição de `título` e `slug` únicos
    - [x] Deletar
      - [x] Do tipo `soft delete` para se manter histórico e equivalente a despublicar

## Arquitetura

A `API` foi desenvolvida seguindo diversas boas práticas e princípios arquiteturais para que se mantenha robusta e escalável para novas implementações.

- DDD ( domain driven design )
- SOLID
- Clean code
- DTO
- Repository in memory
- Repository pattern
- Adapters
- DRY ( dont repeat yourself )

> **IMPORTANTE !**
>
> - Os módulos `Categories` e `Teachers` estão representados apenas com as 3 principais pastas do `DDD`, uma vez que são exatamente iguais ao já representado em sua totalidade, o `Articles`.

![Arquitetura da API Dinamiques Nest](docs/dinamiques-api-nest-architecture.png)

## CI/CD

Embora esteja sendo utilizado o `husky` com o `lintstaged` para já validar o arquivo tanto em sua estrutura de código, quanto na validação dos testes após cada `push`. Há ainda um `workflow` configurado com o `github actions` responsável por efetuar os fluxos abaixo, assim como executar os devidos `scripts` definidos em `package.json` com o sufixo `ci`.

- **Integração contínua**
  - Validação de testes **unitários** a cada `push` e em qualquer `branch`
  - Validação de testes de **integração** e de **e2e** em cada `pull request`
- **Entrega contínua**
  - Após ser efetuado um `push` na `branch main` e já ter sido executado todo o fluxo de integração contínua, será feito o `build` prévio da aplicação e disponibilizada a imagem no `dockerhub`.

> **DICA !**
>
> Para mais detalhes das configurações feitas, pode-se acessar os arquivos na pasta [workflows](./.github/workflows/).

## Como executar

### Testes

#### Pré-requisitos

Instalar as dependências do projeto.

```bash
$ pnpm install
```

Gerar `schemas` do `prisma` executando o comando abaixo, mesmo em repositório em memória, apenas para o `ESLint` ( em tempo de desenvolvimento no `VSCode` ) não apontar que o nome do modelo não existe.

```bash
$ pnpm run prisma:generate
```

#### Unitários

```bash
$ pnpm run test:unit
```

#### Integração

```bash
$ pnpm run test:integration
```

#### E2E

```bash
$ pnpm run test:e2e
```

#### Cobertura

Será gerado um relatório no terminal, assim como um arquivo `index.html` dentro da pasta `./coverage/lcov-report/index.html` que poderá ser aberto para uma visão mais ampla.

```bash
$ pnpm run test:coverage
```

#### Debug

```bash
$ pnpm run test:debug
```

### Linters

A execução dos `linters` podem ser aplicados automaticamente dependendo da configuração do seu editor de código, ao salvar um arquivo, por exemplo, no `VSCODE`.
Mas se caso desejar executar via comando poderá executar os seguintes:

#### Eslint

```bash
$ pnpm run lint:fix
```

#### Prettier

```bash
$ pnpm run prettier:format
```

### Localmente

#### Pré-requisitos

Instalar as dependências do projeto.

```bash
$ pnpm install
```

Gerar `schemas` do `prisma` executando o comando abaixo, mesmo em repositório em memória, apenas para o `ESLint` ( em tempo de desenvolvimento no `VSCode` ) não apontar que o nome do modelo não existe.

```bash
$ pnpm run prisma:generate
```

Configure previamente as variáveis de ambiente criando um arquivo `.env` na raiz do projeto. É possível obter o nome das variáveis a serem definidas, no arquivo `.env.example` contida na pasta raiz do projeto.

```bash
# Informe uma porta a qual será utilizada pela API. Se não for definida uma, o padrão será 3000
APP_PORT=

# Informe um termo para o secret do token
JWT_SECRET=

# Informe um intervalo em segundos para a expiração do token
JWT_EXPIRES_IN=

# Informe se usará ( true ) repositório em memória ( dados serão perdidos após encerrar a execução ) ou ( false ) para utilizar o banco de dados Postgresql. Se não for definido, o padrão é false
DATABASE_IN_MEMORY=

# ATENÇÃO!
# As variáveis abaixo são necessárias definir somente se for utilizar o prisma e a variável DATABASE_IN_MEMORY estiver igual a false ou vazia

# Informe a url de conexão do banco de dados Postgresql. Para onde estiver [] substitua com os dados indicados que desejar. Exemplo: postgres://admin:1234@postgres:5432/bd?schema=public
DATABASE_URL="postgres://[SEU_USUARIO]:[SUA_SENHA]@postgres:5432/[NOME_DO_BANCO_A_SER_CRIADO]?schema=public"

# Informe o protocolo que no caso é obrigatório a ser postgres
DATABASE_PROTOCOL=postgres

# Informe o host que deverá ser o mesmo definido em DATABASE_URL antes da porta 5432
DATABASE_HOST=postgres

# Informe a porta a qual o banco de dados estará disponível. Recomendado utilizar a 5432 e deverá ser a mesma definida em DATABASE_URL
DATABASE_PORT=5432

# Informe o nome do seu usuário que se autentica no banco de dados Postgresql e deverá ser o mesmo definido em DATABASE_URL
DATABASE_USER=

# Informe a senha que se autentica no banco de dados Postgresql e deverá ser a mesma definida em DATABASE_URL
DATABASE_PASSWORD=

# Informe o nome do banco de dados que irá criar no Postgresql e deverá ser o mesmo definido em DATABASE_URL
DATABASE_NAME=
```

#### Repositório em memória

Caso tenha definido a variável `DATABASE_IN_MEMORY=true`, será utilizado um banco de dados em memória ( array ) e após o encerramento da execução, os dados serão perdidos.
Como não será necessário utilizar um banco de dados como o `Postgresql`, então basta executar o comando abaixo para executar a aplicação.

```bash
$ pnpm start:dev
```

#### Repositório com o prisma

Caso tenha definido a variável `DATABASE_IN_MEMORY=false` e preenchido as demais variáveis necessárias indicadas anteriormente, logo será utilizado o `prisma` como `ORM` e o banco de dados `Postgresql`.
Para facilitar a inicialização do banco de dados antes da aplicação, foi estruturado uma sequência de passos com o `Docker` e `Docker Compose` e para iniciar, basta executar o comando abaixo que todo o processo de `build` será efetuado.

```bash
$ docker-compose up
```

#### Autenticação com usuário padrão

Tanto se for utilizado o repositório em memória, quanto com o prisma, como a rota de criação de usuário é protegida com autenticação, foi criado um usuário padrão para que seja possível se autenticar e criar novos usuários ou acessar demais recursos. Segue abaixo dados do usuário para autenticação inicial.

```json
{
  "email": "leticia.pereira@dinamiques.com.br",
  "password": "admin"
}
```

### Swagger

Após iniciar a aplicação, tanto com `pnpm start:dev` ou `docker-compose up`, a documentação da `API` estará disponível em `http://localhost:3000/api/v1/docs` e para se autenticar, basta utilizar as credenciais fornecidas logo acima no passo "Autenticação com usuário padrão".

## Tecnologias

- [Docker](https://www.docker.com/)
- [CI/CD: GitHubActions](https://docs.github.com/pt/actions)
- [Nest.js](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [UUID](https://www.npmjs.com/package/uuid)
- [ClassTransformer](https://www.npmjs.com/package/class-transformer/v/0.1.0-beta.10)
- [ClassValidator](https://github.com/typestack/class-validator)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TSConfigPaths](https://www.npmjs.com/package/tsconfig-paths)
- [GitCommitMsgLinter](https://www.npmjs.com/package/git-commit-msg-linter)
- [LintStaged](https://github.com/lint-staged/lint-staged)
- [Husky](https://typicode.github.io/husky/)
- [Jest](https://jestjs.io/pt-BR/)
- [Faker.js](https://fakerjs.dev/)
- [Prisma](https://www.prisma.io/)
- [Swagger](https://swagger.io/)

> **DICA !**
>
> Todas as demais dependências utilizadas podem ser visualizados acessando o [package.json](./package.json).

## Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/felipe-dr">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62888625?s=96&v=4" width="100px;" alt="Avatar do autor" />
        <br />
        <sub>
          <b>Felipe DR</b>
        </sub>
      </a>
      <br />
      <a href="mailto:felipe.corp7@gmail.com" title="E-mail">📩</a>
    </td>
  </tr>
</table>
