# AgroPainel Sul do Maranhão

Sistema de gestão de talhões, operações agrícolas, clima e relatório de safra para produtores do sul do Maranhão.

**Tema:** A — Aula 10, Programação para Web (UNIBALSAS)  
**Aplicação publicada:** a definir (inserir o link após publicação)

## Equipe

| Integrante | Responsável por |
|---|---|
| Preencher nome 1 | Definir responsabilidade |
| Preencher nome 2 | Definir responsabilidade |

## Como rodar

É necessário ter o Node.js instalado. No terminal do VS Code:

```bash
npm install
npm run dev
```

Abra a URL informada pelo Vite (geralmente `http://localhost:5173/`).

## Comandos

```bash
npm run dev       # desenvolvimento
npm test          # testes Vitest
npm run build     # checagem TypeScript + build de produção
npm run preview   # visualizar build local
```

## Tecnologias

React, TypeScript, Vite, React Router com HashRouter, Context API, localStorage, Vitest, CSS e API Open-Meteo.

## Telas

- `/#/` — Painel e clima
- `/#/talhoes` — Listagem, busca e filtros
- `/#/talhoes/novo` — Cadastro
- `/#/talhoes/:id` — Detalhes e diário de operações
- `/#/talhoes/:id/editar` — Edição e exclusão
- `/#/relatorio` — Relatório da safra
- Endereço inválido — Página não encontrada

## Fonte de dados

Clima atual e previsão de sete dias: [Open-Meteo](https://open-meteo.com/).  
Atribuição: **Dados meteorológicos: Open-Meteo.com**.

Os dados cadastrados pelo usuário ficam apenas no `localStorage` deste navegador. Não existe servidor de dados ou login.

## Estrutura

- `src/tipos` — interfaces e uniões TypeScript
- `src/dados` — lista fixa dos oito municípios
- `src/dominio` — regras puras e testes
- `src/servicos` — requisição à Open-Meteo
- `src/contexto` — estado compartilhado e persistência
- `src/componentes` — componentes reaproveitáveis
- `src/paginas` — páginas e formulários

## Regras e testes

Os cenários A01 a A13 são cobertos por testes de regras em `src/dominio/regras.test.ts`. Os cenários A14 (troca de município) e A15 (falha de rede) devem ser conferidos manualmente na interface. Execute `npm test` para rodar os testes após instalar as dependências.

## Limitações e próximos passos

Este pacote é uma **primeira versão funcional para desenvolvimento**, não é a entrega final avaliada. A equipe deve testar os cenários na interface, revisar acessibilidade, publicar a aplicação, adicionar os nomes reais e registrar commits de todos os integrantes. As operações são armazenadas no navegador; não há sincronização entre dispositivos.

## Referência

Enunciado da Aula 10 — Prof. Marcos David Souza Ramos, UNIBALSAS.
