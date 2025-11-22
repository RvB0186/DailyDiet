# Daily Diet - Projeto Fullstack

Projeto desenvolvido para a disciplina de **Programação para WEB II**, com o objetivo de criar uma aplicação completa (Fullstack) para controle de dieta diária.

A aplicação permite que usuários registrem suas refeições, indiquem se estão dentro ou fora da dieta e acompanhem métricas de progresso.

---

## 📋 Requisitos do Projeto

Conforme solicitado na **Atividade A2**, o sistema atende às seguintes regras de negócio:

### Funcionalidades Principais
- [x] **Cadastro de Usuário:** Permite criar um usuário.
- [x] **Identificação:** O usuário é identificado entre as requisições (via Header).
- [x] **CRUD de Refeições:**
  - Registrar refeição com: Nome, Descrição, Data/Hora e indicador de dieta (Sim/Não).
  - Editar refeições existentes.
  - Excluir refeições.
  - Visualizar uma única refeição.
- [x] **Listagem:** Listar todas as refeições de um usuário específico.
- [x] **Métricas:** Dashboard que exibe:
  - Quantidade total de refeições.
  - Total de refeições dentro da dieta.
  - Total de refeições fora da dieta.
  - Melhor sequência de refeições dentro da dieta.

### Regras de Negócio
- [x] **Permissões:** Usuários só podem visualizar, editar e apagar refeições criadas por eles mesmos.

---

## 🚀 Tecnologias Utilizadas

O projeto foi dividido em duas camadas (Backend e Frontend) para garantir a separação de responsabilidades e organização do código.

### Backend (Node.js)
Desenvolvido com foco em estruturação de API RESTful.
- **Node.js & Express:** Servidor e rotas.
- **UUID:** Geração de IDs únicos para usuários e refeições.
- **CORS:** Permissão de acesso para o frontend.
- **Banco de Dados:** Armazenamento em memória (Arrays) para fins didáticos e execução imediata.

### Frontend (React + Vite)
Interface interativa e responsiva.
- **React & Vite:** Construção da interface SPA (Single Page Application).
- **Styled Components:** Estilização global e componentes com escopo isolado.
- **React
## 📂 Estrutura do Projeto

```text
DAILYDIET/
│
├── backend/           # API Node.js
│   ├── src/
│   │   └── server.js  # Lógica do servidor, rotas e regras de negócio
│   └── package.json
│
└── frontend/          # Interface React
    ├── src/
    │   ├── components/# Componentes reutilizáveis
    │   ├── pages/     # Telas da aplicação (Home, NewMeal, Metrics)
    │   ├── routes/    # Configuração de rotas
    │   ├── services/  # Configuração do Axios (API)
    │   └── styles/    # Temas e estilos globais
    └── index.html

📦 Como Rodar o Projeto
Para executar a aplicação, é necessário rodar o backend e o frontend simultaneamente em terminais separados.

Pré-requisitos
Node.js instalado (v18 ou superior).

Passo 1: Rodar a API (Backend)
Abra um terminal na pasta raiz do projeto.

Acesse a pasta do backend:

Bash

cd backend
Instale as dependências:

Bash

npm install
Inicie o servidor:

Bash

node src/server.js
O servidor rodará na porta 3333.

Passo 2: Rodar a Interface (Frontend)
Abra um novo terminal.

Acesse a pasta do frontend:

Bash

cd frontend
Instale as dependências:

Bash

npm install
Inicie o projeto React:

Bash

npm run dev
Acesse o link exibido no terminal (geralmente http://localhost:5173).

📝 Observações Importantes
Persistência de Dados: Como o backend utiliza armazenamento em memória (variáveis), ao reiniciar o servidor (node src/server.js), os dados cadastrados serão resetados.

Autenticação Automática: Para facilitar os testes, o frontend foi configurado para criar um "Usuário Teste" automaticamente caso não encontre um ID salvo no navegador.
