🖥️ README do FRONTEND
🎨 Interface Web - Controle de Presença

Frontend simples desenvolvido em HTML + Bootstrap + JavaScript,
responsável por interagir com a API do backend e gerenciar presenças via navegador.
Servido por Nginx via Docker.


🧱 Estrutura de Pastas:

```bash
frontend/
├── Dockerfile
├── index.html          ← página inicial/menu principal
├── login.html          ← página de login
├── presenca.html       ← página de registrar/listar presença
└── src/
    └── presenca.js     ← funções JS para login, registrar e listar presença
```

🚀 Como Rodar o Frontend
💡 Opção A — Rodar direto pelo navegador

Inicie o backend (porta 3000).

Abra o arquivo frontend/index.html no navegador.

Preencha o login e comece a registrar presenças.

🐳 Opção B — Rodar com Docker (recomendado)

```bash
cd frontend
docker build -t presenca-frontend .
docker run -d -p 8080:80 presenca-frontend
```

🌐 Acesse: http://localhost:8080

⚙️ Configuração da Conexão

No arquivo src/presenca.js, o backend está definido como:

const dominio = "http://localhost:3000";


Se estiver usando Docker Compose ou um domínio diferente,
altere essa variável conforme necessário.

🧩 Funcionalidades do Frontend

🔐 Login com e-mail e senha

📋 Registro de presença (nome, RA, turma e data)

📅 Listagem de todas as presenças cadastradas

💾 Armazenamento do token JWT no localStorage

🖼️ Tela Principal

A interface contém:

Campos de login (email e senha)

Formulário para registrar presença

Botão para listar presenças

Tabela dinâmica com os registros obtidos da API

🐳 Dockerfile

```bash
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

Simples e eficiente! O Nginx serve diretamente o HTML e o JS estático.

🧠 Fluxo de Funcionamento

Usuário faz login via formulário → recebe token JWT.

Token é salvo no localStorage.

Usuário registra presenças com o token no cabeçalho.

As presenças são listadas dinamicamente via tabela.

## 🔗 Integração com o Backend

| Ação             | Endpoint       | Método HTTP |
| :--------------- | :------------ | :---------- |
| Login            | `/auth/login`  | `POST`      |
| Listar Presenças | `/presenca`    | `GET`       |
| Criar Presença   | `/presenca`    | `POST`      |
| Deletar Presença | `/presenca/:id`| `DELETE`    |


💻 Autor:

👨‍💻 Gabriel Mello

🌐 Interface web do projeto Controle de Presença

💬 Conectada ao backend via API RESTful JWT
