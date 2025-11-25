# API - Catálogo de Livros

Esta é uma API RESTful simples, construída com Node.js e Express, para gerir um catálogo de livros.

A API permite operações de CRUD (Create, Read, Update, Delete) sobre o recurso "Livro". As rotas de criação, atualização e exclusão são protegidas e requerem autenticação como Administrador (`admin`). As rotas de leitura são públicas.

## Funcionalidades

* Listar todos os livros (Público)
* Buscar um livro por ID (Público)
* Criar um novo livro (Requer `admin`)
* Atualizar um livro existente (Requer `admin`)
* Deletar um livro (Requer `admin`)
* Sistema de autenticação (Registo e Login) com JWT (JSON Web Tokens).
* Sistema de autorização baseado em funções (`role`: 'usuario' ou 'admin').

## Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 14 ou superior)
* Um gestor de pacotes (npm, já incluído no Node.js)
* A extensão [Thunder Client](https://www.thunderclient.com/) para o VS Code (ou outra ferramenta de teste de API).

## Instalação

1.  Clona este repositório (ou abre a pasta do projeto):
2.  Instala as dependências do projeto:

    ```bash
    npm install
    ```

## Como Executar a API

1.  Inicia o servidor:

    ```bash
    npm start
    ```

2.  O servidor estará a ser executado em `http://localhost:8000`.
    (Verás a mensagem `escutando na porta 8000` na tua consola).

---

## Como Testar o CRUD (com Thunder Client)

Para testar esta API, recomendamos seguir este fluxo para verificar as rotas públicas, a segurança e as rotas de administrador.

*(Nota: Todos os URLs de exemplo assumem que o servidor está a correr em `http://localhost:8000` e que as tuas rotas estão configuradas em `app.js` como `/api/livros` e `/api/usuarios`.)*

### 1. Testar Rotas Públicas (READ)

Estas rotas não requerem autenticação.

#### A. Listar Todos os Livros
* **Ação:** `GET`
* **URL:** `http://localhost:8000/api/livros`
* **Resultado Esperado (Status 200):** Um array JSON com a lista de livros.

#### B. Buscar Um Livro por ID
* **Ação:** `GET`
* **URL:** `http://localhost:8000/api/livros/1`
* **Resultado Esperado (Status 200):** O objeto JSON do livro com `id: 1`.

### 2. Testar Autenticação e Autorização

Vamos garantir que as rotas estão seguras.

#### A. Criar Utilizador Admin (Primeira vez)
* **Ação:** `POST`
* **URL:** `http://localhost:8000/api/usuarios`
* **Body (JSON):** (Vai à aba `Body` -> `JSON` no Thunder Client)
    ```json
    {
      "nome": "Administrador",
      "email": "admin@email.com",
      "senha": "senhaforte123",
      "role": "admin"
    }
    ```
* **Resultado Esperado (Status 201):** O objeto do utilizador admin criado (sem a senha).

#### B. Criar Utilizador Comum
* **Ação:** `POST`
* **URL:** `http://localhost:8000/api/usuarios`
* **Body (JSON):**
    ```json
    {
      "nome": "Utilizador Comum",
      "email": "comum@email.com",
      "senha": "senha123"
    }
    ```
* **Resultado Esperado (Status 201):** O objeto do utilizador comum (com `role: "usuario"`).

#### C. Testar Segurança 401 (Sem Token)
* **Ação:** `POST`
* **URL:** `http://localhost:8000/api/livros`
* **Autenticação:** Nenhuma (garante que não há nada na aba `Auth` ou `Headers`).
* **Body (JSON):** (um livro qualquer)
* **Resultado Esperado (Status 401):** `{ "message": "Token não fornecido." }`

#### D. Testar Segurança 403 (Token Inválido / Sem Permissão)
1.  **Faz Login como Utilizador Comum:**
    * `POST` para `http://localhost:8000/api/usuarios/login`
    * Body: `{ "email": "comum@email.com", "senha": "senha123" }`
    * Copia o `token` do corpo da resposta.
2.  **Tenta Criar um Livro:**
    * **Ação:** `POST`
    * **URL:** `http://localhost:8000/api/livros`
    * **Aba `Headers`:**
        * `Header`: `Authorization`
        * `Value`: `Bearer [TOKEN_DO_UTILIZADOR_COMUM]`
    * **Body (JSON):** (um livro qualquer)
* **Resultado Esperado (Status 403):** `{ "message": "Acesso negado. Requer privilégios de administrador." }`

### 3. Testar o CRUD Completo (Como Admin)


#### A. Obter Token de Admin
1.  **Faz Login como Admin:**
    * `POST` para `http://localhost:8000/api/usuarios/login`
    * Body: `{ "email": "admin@email.com", "senha": "senhaforte123" }`
    * Copia o `token` recebido na resposta.
2.  **Instrução:** Usa este token (`Bearer [TOKEN_DE_ADMIN]`) na aba `Headers` para todos os testes seguintes (CREATE, UPDATE, DELETE).

#### B. CREATE (Criar Livro)
* **Ação:** `POST`
* **URL:** `http://localhost:8000/api/livros`
* **Autenticação (Aba `Headers`):** `Authorization` | `Bearer [TOKEN_DE_ADMIN]`
* **Body (JSON):**
    ```json
    {
      "titulo": "Duna",
      "autor": "Frank Herbert",
      "genero": "Ficção Científica",
      "ano_publicacao": 1965
    }
    ```
* **Resultado Esperado (Status 201):** O objeto do livro "Duna" criado, com o seu novo `id`. **Guarda este `id`** (ex: `4`).

#### C. UPDATE (Atualizar Livro)
* **Ação:** `PUT`
* **URL:** `http://localhost:8000/api/livros/[ID_DO_LIVRO_CRIADO]` (ex: `/api/livros/4`)
* **Autenticação (Aba `Headers`):** `Authorization` | `Bearer [TOKEN_DE_ADMIN]`
* **Body (JSON):** (Vamos mudar o ano de publicação)
    ```json
    {
      "ano_publicacao": 1966
    }
    ```
* **Resultado Esperado (Status 200):** O objeto completo do livro "Duna", com o ano atualizado para `1966`.

#### D. DELETE (Remover Livro)
* **Ação:** `DELETE`
* **URL:** `http://localhost:8000/api/livros/[ID_DO_LIVRO_CRIADO]` (ex: `/api/livros/4`)
* **Autenticação (Aba `Headers`):** `Authorization` | `Bearer [TOKEN_DE_ADMIN]`
* **Resultado Esperado (Status 200):** `{ "message": "Livro removido com sucesso" }`

#### E. Verificação Final (Opcional)
* **Ação:** `GET`
* **URL:** `http://localhost:8000/api/livros/[ID_DO_LIVRO_APAGADO]` (ex: `/api/livros/4`)
* **Autenticação:** Nenhuma.
* **Resultado Esperado (Status 404):** `{ "message": "Livro não encontrado." }`