<h1 align="center"><img src=".github/assets/logo.svg" width="420px" /></h1>

<p align="center">Plataforma para encontrar e conectar jogadores para fazerem aquele duozinho maneiro no seu jogo preferido </p>

## ✅ Demostração

## 🎉 Sobre o projeto
O projeto foi desenvolvido durante a semana da NLW feita pela Rocketseat e eu fiz implementações diferentes no backend do projeto

## 🚀 Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:

* [TypeScript](https://typescriptlang.org) - TypeScript extends JavaScript by adding types to the language.
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Vite](https://vite.dev/) - Vite Next Generation Frontend Tooling
* [tailwindcss](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
* [Radix UI](https://www.radix-ui.com/) - Why waste time reinventing UI components?
* [Expo](https://expo.dev/) - Build one project that runs natively on all your users' devices
* [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Vitest](https://vitest.dev/) - A Vite-native unit test framework. It's fast!
* [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
* [PrismaORM](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
* [Docker](https://www.docker.com/) - Develop faster. Run anywhere.

<p>
<img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="typescript" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/react.svg" alt="reactjs" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/vitejs.svg" alt="vite" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg" alt="vite" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://avatars.githubusercontent.com/u/75042455?s=280&v=4" alt="radixui" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/vitest.svg" alt="vitest" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/expo-icon.svg" alt="expo" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" alt="nodejs" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="postgresql" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/prisma.svg" alt="prismaorm" width="45" height="45" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="docker" width="45" height="45" style="margin-left: 5px;"/>

## ✨ Funcionalidades

## 👨🏼‍💻 Como executar
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📃 *Pre-requisitos*
- **Node.js** - Para rodar este projeto é necessário ter [Node.js](https://nodejs.org/) instalado em sua maquina. Caso não tenha ainda basta acessar o site do [Node.js](https://nodejs.org/) e instalar para continuar.
- **Docker**
```
O projeto pode ser executado com Docker, para isso você deve ter ele em sua maquina local para executar o projeto e caso você queria instalar o Docker para Ubuntu/Windows vou deixar dois links abaixo;
```
- https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
- https://docs.docker.com/desktop/windows/install/

### 🔧 *Instalação*
- Clone este repositório
```bash
git clone https://github.com/alnmaurofranco/nlw-esports
```
- Acesse a pasta do projeto
```bash
cd nlw-esports
```
- Instale as dependências de cada projeto com (pnpm, yarn ou npm) nesse exemplo estou usando **yarn** e vou primeiramente executar na pasta web
- **⚠ IMPORTANTE! Faça isso também para as outras pastas (server e mobile)**
```bash
cd web && yarn install
```
- Após a instalação, você deve renomear o arquivo `.env.example` para `.env` que se encontra nas raizes dos projetos e modifique a variavel de acordo com a sua configuração.

### *Executando a aplicação*
- Após completa todas as instalações, vamos iniciar nossa aplicaçaõ web com o seguinte comando:
```
cd web && yarn dev
```
- Pronto, agora sua aplicação web está rodando e já pode ser acessada em: http://localhost:5411

#### **🔥 Sem Docker no backend (SERVER)**
- Após a instalação das dependecias, você deve renomear o arquivo `.env.example` para `.env` que se encontra na raiz do projeto e modifique a variavel **DATABASE_URL** com suas configurações do seu banco de dados:
```bash
DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DATABASE?schema=public"
```
- Inicie a API com o comando:
```bash
yarn start:dev
```
- **Pronto agora sua aplicação backend (server) está rodando e já pode ser acessado em** [`http://localhost:3333/api`](http://localhost:3333/api)

#### **🐳 Com Docker no backend (SERVER)**
- Subindo o container do projeto no Docker utilizando o comando abaixo:
```bash
docker-compose up -d
```
- E depois de subir o container, você deve renomear o arquivo `.env.example` para `.env` que se encontra na raiz do projeto e modificar a variavel **DATABASE_URL** com as configurações abaixo:
```bash
DATABASE_URL="postgresql://root:docker@api-database:5432/esportsdb?schema=public"
```
- **Pronto agora sua aplicação backend (server) está rodando no Docker e já pode ser acessado em** [`http://localhost:3333/api`](http://localhost:3333/api)

- O comando a seguir é para a execução do projeto mobile:
```
cd mobile && yarn start
```
- Pronto agora sua aplicação mobile está disponível para ser acessada

### 🧪 *Executando os testes*
A seguir iremos executar os testes da aplicação no backend (server)
```bash
cd server && yarn test
```
- *Pronto, teste da aplicação do seu **backend (server)** foi realizado.*

## 🪄 Melhorias em desenvolvimento

- **API**
  - [x] Arquitetura Limpa/Domain Driven Design/Código Limpo
  - [x] Testes
  - [x] Adicionar validação
  - [x] Adicionar autenticação
    - [x] Adicionar autenticação mágica com e-mail
    - [x] Autenticar com provedor do Discord
    - [x] Autenticar com provedor da TwitchTV
---
<h3 align="center">

*Feito com 💚 by [AlanM Franco](https://github.com/alnmaurofranco)*
</h3>
