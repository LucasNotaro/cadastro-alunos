# Sistema de Cadastro de Alunos

Sistema completo para gerenciamento de cadastro de alunos com frontend mobile e backend API.

## Estrutura do Projeto

- **Front**: Aplicação React Native com Expo
- **Server**: API REST em Node.js com Express e MongoDB

## Funcionalidades

- Cadastro, edição e exclusão de alunos
- Consulta automática de endereço por CEP (ViaCEP)
- Listagem de alunos com busca
- Visualização detalhada de dados
- Gerenciamento de cursos por aluno

## Tecnologias

### Frontend
- React Native 0.79.6
- Expo 54.0.8
- React 19.0.0

### Backend
- Node.js
- Express 5.1.0
- MongoDB com Mongoose 8.18.0
- CORS habilitado

## Instalação e Execução

### Backend
```bash
cd Server
npm install
npm start
```

### Frontend
```bash
cd Front
npm install
npm start
```

## Configuração

1. Instale o MongoDB localmente
2. Ajuste a URL da API no arquivo `Front/App.js` para o IP da máquina
3. Execute o servidor na porta 3000
4. Execute o frontend com Expo

## API Endpoints

- `GET /alunos` - Lista todos os alunos
- `GET /alunos/:id` - Busca aluno por ID
- `POST /alunos` - Cria novo aluno
- `PUT /alunos/:id` - Atualiza aluno
- `DELETE /alunos/:id` - Remove aluno
- `GET /viacep/:cep` - Consulta CEP no ViaCEP