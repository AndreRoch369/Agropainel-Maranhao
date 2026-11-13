# AgroPainel Sul do Maranhão

# 1. Nome e descrição da aplicação

O AgroPainel Sul do Maranhão é uma aplicação web desenvolvida com o objetivo de auxiliar no acompanhamento e no gerenciamento de informações relacionadas à atividade agrícola. O sistema permite cadastrar e consultar talhões, acompanhar informações da safra, visualizar indicadores e acessar dados meteorológicos que podem contribuir para o planejamento das atividades no campo.

A proposta é reunir informações importantes em um único ambiente, facilitando a visualização dos dados e o acompanhamento das atividades agrícolas.

## 2. Link da aplicação publicada

Aplicação online: https://agropainel-maranhao.vercel.app/#/

Repositório no GitHub:
[https://github.com/AndreRoch369/Agropainel-Maranhao](https://github.com/AndreRoch369/Agropainel-Maranhao)

## 3. Tema escolhido

Tema A – AgroPainel Sul do Maranhão.

O projeto foi desenvolvido com foco no contexto agrícola da região Sul do Maranhão, considerando a necessidade de organizar informações sobre propriedades, talhões, culturas, plantio, custos e produção.

# 4. Equipe e divisão de responsabilidades

Equipe: AgroTech Maranhão

Integrantes:

 | Integrante | Responsabilidade |

 | [Mickael Miranda de Sousa 1] | Desenvolvimento, integração da aplicação e Regras de negócio |
 | [André Rocha Figueredo 2] | Interface, componentes do sistema, testes e documentação |

A equipe participou do planejamento, desenvolvimento, implementação das funcionalidades, testes e organização da documentação do sistema.

## 5. Tecnologias utilizadas

As principais tecnologias utilizadas no desenvolvimento foram:

- React 19: construção da interface da aplicação.
- TypeScript: tipagem e organização do código.
- Vite: ferramenta de desenvolvimento e construção do projeto.
- React Router DOM: gerenciamento da navegação entre as páginas.
- HashRouter: organização das rotas da aplicação.
- Context API: compartilhamento e gerenciamento dos dados entre componentes.
- localStorage: armazenamento dos dados no navegador.
- Vitest: execução dos testes automatizados.
- Open-Meteo API: obtenção de informações meteorológicas.

## 6. Instruções para execução da aplicação

Para executar o projeto localmente, é necessário ter o Node.js instalado no computador.

## 6.1. Clonar o repositório

```bash
git clone https://github.com/AndreRoch369/Agropainel-Maranhao.git
```

## 6.2. Entrar na pasta do projeto

```bash
cd Agropainel-Maranhao
```

## 6.3. Instalar as dependências

```bash
npm install
```

## 6.4. Executar a aplicação

```bash
npm run dev
```

Após executar o comando, o Vite apresentará o endereço local para acessar a aplicação pelo navegador, normalmente:

```text
http://localhost:5173
```

## 6.5. Executar os testes

```bash
npm test
```

## 6.6. Gerar a versão de produção

```bash
npm run build
```

# 7. Telas da aplicação e rotas

As capturas de tela apresentadas nesta seção estão disponíveis na pasta `docs/capturas` do projeto, onde foram organizadas para documentar visualmente as principais funcionalidades do sistema.

A aplicação utiliza React Router com HashRouter para organizar a navegação entre as páginas.

# 8. Regras de negócio e organização dos arquivos

O sistema foi organizado para facilitar a manutenção e a separação das responsabilidades entre as partes da aplicação.

Entre as principais regras e funcionalidades implementadas, destacam-se:

- Cadastro de talhões com informações da área agrícola.
- Consulta e visualização dos talhões cadastrados.
- Pesquisa e filtragem dos registros.
- Edição das informações dos talhões.
- Exclusão de registros cadastrados.
- Atualização dos indicadores do painel conforme os dados disponíveis.
- Apresentação de informações relacionadas à safra, aos custos e à produção.
- Consulta de informações meteorológicas para auxiliar no planejamento agrícola.

A organização do código está dividida em diretórios, de acordo com suas responsabilidades:

- src/componentes: componentes reutilizáveis da interface.
- src/contexto: gerenciamento e compartilhamento dos dados da aplicação.
- src/dominio: regras e lógica relacionadas ao funcionamento do sistema.
- src/paginas: páginas e telas da aplicação.
- src: arquivos principais de configuração e inicialização.

Os dados dos talhões são armazenados no localStorage do navegador, permitindo sua persistência no mesmo navegador e dispositivo.

## 9. Decisões técnicas adotadas

Durante o desenvolvimento, foram adotadas decisões técnicas para manter a aplicação organizada e facilitar sua evolução.

A utilização do React permitiu dividir a interface em componentes reutilizáveis, enquanto o TypeScript contribuiu para melhorar a organização e a segurança dos dados utilizados no código.

O React Router DOM, com HashRouter, foi utilizado para controlar a navegação entre as páginas. A Context API foi adotada para compartilhar informações entre os componentes, evitando a necessidade de passar os mesmos dados manualmente por várias partes da aplicação.

O localStorage foi utilizado para armazenar os registros no próprio navegador. Essa escolha permitiu implementar a persistência dos dados sem a necessidade de configurar um servidor ou banco de dados remoto nesta versão.

Também foi utilizado o Vitest para verificar o funcionamento das regras implementadas por meio de testes automatizados.

# 10. Testes realizados

Durante o desenvolvimento, foram realizados testes automatizados para verificar o comportamento das regras da aplicação.

O resultado registrado na execução dos testes foi:

```text
Test Files  1 passed (1)
Tests       19 passed (19)
```

Também foi realizada a compilação de produção utilizando o comando:

```bash
npm run build
```

A compilação foi concluída com sucesso, indicando que a aplicação conseguiu gerar os arquivos necessários para publicação.

Além dos testes automatizados, foram realizadas verificações práticas nas funcionalidades de cadastro, edição, exclusão e atualização das informações apresentadas no painel.

# 11. Créditos e fontes externas

Para obter informações meteorológicas, o projeto utiliza a Open-Meteo API, serviço que disponibiliza dados de previsão do tempo por meio de consultas à sua interface de programação.

- Open-Meteo: [https://open-meteo.com/](https://open-meteo.com/)

Agradecimentos aos serviços, ferramentas e tecnologias de código aberto utilizados durante o desenvolvimento da aplicação.

# 12. Considerações finais

O desenvolvimento do AgroPainel Sul do Maranhão possibilitou colocar em prática conhecimentos relacionados ao desenvolvimento web, organização de componentes, gerenciamento de dados, implementação de regras de negócio e realização de testes.

A aplicação reúne funcionalidades voltadas ao acompanhamento de informações agrícolas e representa uma versão funcional do projeto, que poderá receber melhorias e novas funcionalidades em etapas futuras.




