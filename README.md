# AgroPainel Sul do Maranhão 

O AgroPainel Sul do Maranhão é uma aplicação web desenvolvida para auxiliar no acompanhamento e gerenciamento de atividades agrícolas. O sistema permite cadastrar e gerenciar talhões, registrar operações da safra, consultar condições meteorológicas e visualizar indicadores relacionados à produção agrícola.

## Informações do projeto

- Nome da aplicação: AgroPainel Sul do Maranhão
- Equipe: AgroTech Maranhão
- Tema: A — AgroPainel
- Disciplina: Programação para Web
- Instituição: Centro Universitário de Balsas – UNIBALSAS
- Professor: Marcos David Souza Ramos

Aplicação publicada: https://agropainel-maranhao.vercel.app/

Repositório GitHub: https://github.com/AndreRoch369/Agropainel-Maranhao

## Equipe

| Integrante | Responsabilidade |

| [Mickael Miranda de Sousa 1] | Desenvolvimento, integração da aplicação e Regras de negócio |
| [André Rocha Figueredo 2] | Interface, componentes do sistema, testes e documentação  |


## Tecnologias utilizadas

- React: desenvolvimento da interface por componentes.
- TypeScript: tipagem e organização do código.
- Vite: ambiente de desenvolvimento e geração da versão de produção.
- React Router DOM: gerenciamento da navegação entre as páginas.
- Context API: compartilhamento dos dados entre os componentes.
- localStorage: armazenamento dos cadastros no navegador.
- Vitest: execução dos testes automatizados.
- Open-Meteo: consulta de informações meteorológicas.

# Funcionalidades

- Visualização de indicadores gerais da safra.
- Consulta de condições meteorológicas por município.
- Previsão do tempo e indicador de condições para pulverização.
- Cadastro, consulta, edição e exclusão de talhões.
- Registro de operações agrícolas.
- Acompanhamento do desenvolvimento das culturas.
- Estimativa da previsão de colheita.
- Relatório de área, custos e produção.

# Como executar o projeto

# Pré-requisitos

É necessário ter o Node.js e o npm instalados no computador.

# 1. Clonar o repositório

```bash
git clone https://github.com/AndreRoch369/Agropainel-Maranhao.git
```

### 2. Entrar na pasta do projeto

```bash
cd Agropainel-Maranhao
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar a aplicação

```bash
npm run dev
```

O Vite apresentará um endereço local no terminal, normalmente `http://localhost:5173/`. Abra esse endereço no navegador.

### 5. Executar os testes

```bash
npm test
```

### 6. Gerar a versão de produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist`.

# Telas da aplicação


As capturas de tela apresentadas nesta seção estão disponíveis na pasta `docs/capturas` do projeto, onde foram organizadas para documentar visualmente as principais funcionalidades do sistema.

A aplicação utiliza React Router com HashRouter para organizar a navegação entre as páginas.

# Regras de negócio

As principais regras estão organizadas no arquivo `src/dominio/regras.ts`.

1. Validação do cadastro: verifica o preenchimento correto dos dados do talhão.
2. Nome único: impede o cadastro de talhões com nomes duplicados.
3. Validação da área: exige uma área maior que zero e respeita o limite definido pelo sistema.
4. Data de plantio: impede o registro de datas futuras.
5. Previsão de colheita: calcula uma estimativa conforme a cultura e a data de plantio.
6. Situação da cultura: identifica se o talhão está aguardando plantio, em desenvolvimento ou próximo da colheita.
7. Registro de operações: valida as atividades agrícolas conforme suas regras.
8. Controle de colheita: impede o registro de uma segunda colheita para o mesmo talhão.
9. Cálculo de custos: realiza cálculos de custos totais e por hectare.
10. Produção agrícola: calcula indicadores relacionados à produtividade e produção em sacas.

Os testes automatizados dessas regras estão no arquivo `src/dominio/regras.test.ts`.

Durante a execução registrada, foram aprovados 19 testes automatizados, sem falhas.

## Organização do projeto

```text
agropainel/
├── docs/
│   └── capturas/
│       ├── painel.png
│       ├── talhoes.png
│       ├── novo-talhao.png
│       ├── detalhe-talhao.png
│       ├── editar-talhao.png
│       └── relatorio.png
├── src/
│   ├── componentes/
│   ├── contexto/
│   ├── dados/
│   ├── dominio/
│   ├── paginas/
│   ├── servicos/
│   ├── tipos/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

# Decisões técnicas

O projeto foi organizado utilizando componentes React para separar as funcionalidades e facilitar a manutenção do código.

O TypeScript foi utilizado para melhorar a organização e a tipagem dos dados. A Context API permite compartilhar as informações dos talhões e das operações entre as páginas.

O armazenamento dos dados é realizado por meio do localStorage, permitindo que os cadastros permaneçam disponíveis no navegador mesmo após a atualização da página.

As regras de negócio foram separadas dos componentes visuais, facilitando a realização dos testes automatizados.

Para as informações meteorológicas, foi utilizada a API Open-Meteo. A navegação utiliza HashRouter, facilitando a publicação da aplicação em hospedagem estática.

Limitação da versão: os dados dos cadastros ficam armazenados localmente no navegador. O sistema não utiliza banco de dados remoto nem sincronização entre dispositivos.

# Publicação

A aplicação foi publicada na plataforma Vercel, integrada ao repositório do GitHub.

- Acessar o sistema: https://agropainel-maranhao.vercel.app/
- Acessar o código-fonte: https://github.com/AndreRoch369/Agropainel-Maranhao

# Créditos

- Open-Meteo: API utilizada para consulta de informações meteorológicas. https://open-meteo.com/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Vite: https://vite.dev/
- Vitest: https://vitest.dev/

---

AgroPainel Sul do Maranhão — AgroTech Maranhão

Projeto acadêmico desenvolvido para a disciplina de Programação para Web, do curso de Análise e Desenvolvimento de Sistemas do Centro Universitário de Balsas – UNIBALSAS.