# Desafio Front-End BeTalent

Este repositório contém a solução para o desafio prático da BeTalent, que consiste em construir uma interface responsiva para visualização de dados de colaboradores, com funcionalidades de pesquisa e exibição de informações formatadas.

## Estrutura do Repositório

O repositório é dividido em dois pacotes principais:

- `client`: Contém a aplicação front-end.
- `server`: Contém a API simulada utilizando o `json-server`.

## Tecnologias Utilizadas

### Front-End (`client`):

- **React.js** (com TypeScript)
- **Tailwind CSS** para estilização
- **Vite** como bundler
- **ESLint** para linting
- **React Hooks** e **State Management** com `useState` e `useEffect`

### Back-End Simulado (`server`):

- **json-server** para simulação da API RESTful

## Instalação

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **Yarn** (recomendado) ou **npm**

### Passos para rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/mehiel-victor/desafio-front-end
cd desafio-front-end
```

2. Instale as dependências:

- Para o client:

```bash
cd client
yarn install
```

- Para o server:

```bash
cd server
yarn install
```

3. Inicie a API simulada (json-server):

```bash
cd server
yarn start
```

Isso iniciará a API no endpoint http://localhost:3001/employees.

4. Inicie a aplicação front-end:

```bash
cd client
yarn dev
```

Isso iniciará o front-end no endereço http://localhost:5173.

## Funcionalidades

- **Exibição de Tabela**: A tabela exibe uma lista de colaboradores com foto, nome, cargo, data de admissão e telefone.
- **Pesquisa**: Permite filtrar os funcionários por nome, cargo ou telefone.
- **Responsividade**: O layout se adapta para dispositivos móveis e desktop.
- **Formatação de Dados**: As datas são formatadas em `DD/MM/YYYY` e os números de telefone têm uma máscara.

## Estrutura de Diretórios

```
desafio-front-end
├─ client
│ ├─ README.md
│ ├─ eslint.config.js
│ ├─ index.html
│ ├─ package.json
│ ├─ public
│ │ └─ betalent.svg
│ ├─ src
│ │ ├─ App.css
│ │ ├─ App.tsx
│ │ ├─ assets
│ │ │ └─ Logo
│ │ │ └─ index.tsx
│ │ ├─ components
│ │ │ ├─ Header
│ │ │ │ └─ index.tsx
│ │ │ ├─ common
│ │ │ │ ├─ EmployeeFilter
│ │ │ │ │ └─ index.tsx
│ │ │ │ └─ EmployeeTable
│ │ │ │ ├─ EmployeeDetails
│ │ │ │ │ └─ index.tsx
│ │ │ │ ├─ EmployeeRow
│ │ │ │ │ └─ index.tsx
│ │ │ │ └─ index.tsx
│ │ ├─ hooks
│ │ │ └─ useEmployee.ts
│ │ ├─ index.css
│ │ ├─ main.tsx
│ │ ├─ types
│ │ │ └─ employee.d.ts
│ │ ├─ utils
│ │ │ ├─ formatDate.ts
│ │ │ └─ formatPhone.ts
│ │ └─ vite-env.d.ts
│ ├─ tsconfig.app.json
│ ├─ tsconfig.json
│ ├─ tsconfig.node.json
│ └─ vite.config.ts
├─ package.json
├─ server
│ ├─ README.md
│ ├─ db.json
│ ├─ package.json
│ └─ yarn.lock
└─ yarn.lock
```

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/nomedafeature`).
3. Faça o conventional commit das suas alterações (`git commit -m 'feat: add new feature'`).
4. Faça o push para a sua branch (`git push origin feature/nomedafeature`).
5. Abra um pull request.

## License

MIT License. Veja o arquivo LICENSE para mais detalhes.

## Contato

Se tiver dúvidas ou sugestões, entre em contato pelo e-mail: [mehiel.dev@gmail.com](mailto:mehiel.dev@gmail.com).
