# 📌 Sistema de Recados

Sistema desenvolvido utilizando **Laravel 12** como API REST e **React** como Front-end. O projeto permite que usuários realizem cadastro, login e gerenciem seus próprios recados através de um CRUD completo.

---

## Tecnologias Utilizadas

### Back-end

- PHP  8.2.12
- Laravel 12
- Laravel Sanctum
- MySQL (XAMPP)
- Composer version 2.10.2

### Front-end

- React
- React Router DOM
- Axios
- CSS

---

## Funcionalidades

### Autenticação

- Cadastro de usuário
- Login
- Logout
- Autenticação utilizando Laravel Sanctum
- Token Bearer

### Recados

- Criar recados
- Listar recados
- Editar recados
- Excluir recados

Cada usuário visualiza apenas seus próprios recados.

---

## Estrutura do Projeto

```
TesteGit
│
├── meu-backend
│   ├── app
│   ├── routes
│   ├── database
│   ├── config
│   └── ...
│
└── frontend
    ├── src
    ├── public
    └── ...
```

---

# Como executar o projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/messiasvargascosta0-max/recados-projeto
```

---

## 2. Backend

Entrar na pasta

```bash
cd meu-backend
```

Instalar dependências

```bash
composer install
```

Copiar o arquivo de ambiente

```bash
cp .env.example .env
```

Gerar a chave da aplicação

```bash
php artisan key:generate
```

Configurar o banco de dados no arquivo `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=meu_backend
DB_USERNAME=root
DB_PASSWORD=
```

Executar as migrations

```bash
php artisan migrate
```

Iniciar o servidor

```bash
php artisan serve
```

---

## 3. Front-end

Entrar na pasta

```bash
cd frontend
```

Instalar dependências

```bash
npm install
```

Iniciar o React

```bash
npm start
```

---

# Rotas da API

## Autenticação

### Cadastro

```
POST /api/register
```

### Login

```
POST /api/login
```

### Logout

```
POST /api/logout
```

---

## Recados

### Listar

```
GET /api/recados
```

### Criar

```
POST /api/recados
```

### Atualizar

```
PUT /api/recados/{id}
```

### Excluir

```
DELETE /api/recados/{id}
```

Todas essas rotas exigem autenticação através do Token Bearer.

---

# Banco de Dados

O projeto utiliza MySQL.

Tabela principal:

### users

- id
- name
- email
- password

### recados

- id
- titulo
- texto
- user_id
- created_at
- updated_at

Relacionamento:

```
Usuário (1)
      |
      | possui
      |
Recados (N)
```

---

# Funcionalidades da Interface

- Tela de Login
- Tela de Cadastro
- Tela Principal
- Cadastro de Recados
- Atualização de Recados
- Exclusão de Recados
- Logout

---

# Segurança

O sistema utiliza:

- Laravel Sanctum
- Tokens Bearer
- Middleware `auth:sanctum`
- Senhas criptografadas com Hash

---

# Autor

Messias Vargas Costa

Projeto desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Web.