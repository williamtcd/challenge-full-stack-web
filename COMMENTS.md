# COMMENTS.md

## Decisão da Arquitetura Utilizada

Neste projeto, a arquitetura foi projetada utilizando uma abordagem **cliente-servidor**, onde o backend é construído com **NestJS** e o frontend é implementado com **Vue.js** e **Vuetify**. 

- **Backend (NestJS)**: Optei por utilizar o **NestJS**. Ele segue o padrão MVC (Model-View-Controller). Para persistência de dados, utilizei o **Prisma** como ORM (Object-Relational Mapping) com **MySQL**.
  
- **Frontend (Vue.js + Vuetify)**

- **Comunicação entre Backend e Frontend**: A comunicação entre o frontend e o backend é feita através de **APIs REST** utilizando **Axios** para realizar requisições HTTP. A autenticação é gerenciada por **JWT** (JSON Web Tokens).

- **Docker**: O projeto foi containerizado usando **Docker** para garantir que o ambiente de desenvolvimento seja consistente entre as diferentes máquinas.

## Lista de Bibliotecas de Terceiros Utilizadas

### Backend:
- **NestJS**: Framework para construção de APIs escaláveis.
- **Prisma**: ORM para interação com o banco de dados MySQL.
- **JWT**: Utilizado para autenticação baseada em tokens.
- **class-validator**: Para validação de dados nos DTOs (Data Transfer Objects).
- **class-transformer**: Para transformação e validação de objetos.
- **mysql2**: Driver MySQL utilizado pelo Prisma.

### Frontend:
- **Vue.js**: Framework JavaScript para construção do frontend reativo.
- **Vuetify**: Biblioteca de componentes Material Design para Vue.js.
- **Vue Router**: Para roteamento de páginas no frontend.
- **Axios**: Cliente HTTP para fazer requisições ao backend.
- **Pinia**: Gerenciador de estado (caso esteja sendo utilizado).
- **Vite**: Bundler e servidor de desenvolvimento super rápido.

### Desenvolvimento:
- **ESLint**: Ferramenta para garantir que o código siga os padrões definidos.
- **Prettier**: Para formatação do código.
- **Docker**: Para containerizar o projeto e facilitar o deploy.
- **Vite**: Ferramenta de build e servidor de desenvolvimento do frontend.

## O Que Você Melhoraria Se Tivesse Mais Tempo

1. **Testes Automatizados**: Implementaria testes unitários e de integração utilizando **Jest** no backend (NestJS).

2. **Documentação Completa**: Criaria uma documentação detalhada para o projeto.

3. **Tratamento de Erros**: Aprimoraria o tratamento de erros tanto no frontend quanto no backend para fornecer respostas mais claras e facilitar o diagnóstico de problemas.
