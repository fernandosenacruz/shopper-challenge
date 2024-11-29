# Desafio técnico fullstack para empresa Shopper

## Api criada para consumir a Route API do Google Mpas, retornar uma estimativa do roteiro solicitado e registrar as corridas realizadas pelo cliente

**Back-end**

- **Local**: http://localhost:8080/ride

**Front-end**
- **Local**: http//localhost:80

### Testar Rotas do Back-end

# 💻 Rodar a aplicação na sua máquina 💻

### Você vai precisar ter instalado

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started/) (Recomendado)

## 🐋 Rodar com Docker 🐋

<details>
<summary>Instruções</summary>

## Clonar o repositório

Primeiramente você vai precisar clonar este repositório para qualquer diretório em sua máquina local.

Para isso você vai executar o seguinte comando no seu terminal:

```console
git clone https://github.com/fernandosenacruz/shopper-chalenge.git
```

## Setup

Antes de inicializar o projeto, é importante configurar algumas variáveis de ambiente (.env.example) e instalar as dependências do projeto.

### Configurar o ambiente (.env)

- **Root**
  - Acesse o diretório `./backend-challenger-arrow-digital`
  - Crie o arquivo `.env` com as variáveis de ambiente indicadas:
  ```
  GOOGLE_API_KEY=<SUA_CHAVE_GOOGLE>
  PORT=8080
  MONGO_URL=mongodb://localhost:27017/rides
  REACT_APP_GOOGLE_API_KEY=<SUA_CHAVE_GOOGLE>
  ```
- **Front-end**
  - Crie o arquivo `.env` com as variáveis de ambiente indicadas:
  ```
  REACT_APP_GOOGLE_API_KEY=<SUA_CHAVE_GOOGLE>
  ```

## Acessar a Aplicação

</details>

### Instalar dependências

- Nas pastas `./shopper-challenge` rode o comando `npm install` ou `yarn install`

## Inicializar a Aplicação

- Com Docker utilize o comando `docker compose up` para subir o container e `docker compose down` para matá-los

> Por padrão o back-end inicializa na porta 8080
> Por padrão o fron-end inicializa na porta 80

</details>

## Documentação da API

### Estimate

**Header**
| Chave   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `X-Goog-Api-Key` | `string` |  **Obrigatório**. Chave Google |

**Body**
| Chave   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `customer_id` | `string` | **Obrigatório**. O ID do usuário |
| `origin`      | `string` | **Obrigatório**. Endereço de partida |
| `destination` | `string` | **Obrigatório**. Endereço de chegada |

#### Endpoints

<details>
<summary>expandir</summary>

#### Obtem uma estimativa

  ```
    POST http://localhost:8080/ride/estimate
  ```
</details>

### Confirm

**Body**
| Chave   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `customer_id` | `string` | **Obrigatório**. O ID do usuário |
| `origin`      | `string` | **Obrigatório**. Endereço de partida |
| `destination` | `string` | **Obrigatório**. Endereço de chegada |
| `distance` | `number` | **Obrigatório**. Distância em metros até o destino |
| `duration`      | `string` | **Obrigatório**. Tempo em segundos da corrida Ex: `792s` |
| `value` | `number` | **Obrigatório**. Valor da corrida |
| `driver` | `object` | **Obrigatório**. Dados do motorista. Ex: `driver: { id: 1, name: 'Hommer Simpson'}` |

#### Endpoints

<details>
<summary>expandir</summary>

#### Confirma uma corrida

  ```
    Patch http://localhost:8080/ride/cofirm
  ```
</details>

### Ride

**Header**
| Chave   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `customer_id` | `string` |  **Obrigatório**.  O ID do usuário |

#### Endpoints

<details>
<summary>expandir</summary>

#### Obtem uma estimativa

  ```
    GET http://localhost:8080/ride?ccustomer_id=<ID_DO_USUARIO>
  ```
</details>

# 🚧 Testes 🚧

> Os testes necessitam que as dependências do projeto estejam instaladas (`npm install`)

### Testes Unitários

- rode o comando `npm run test`

## Tecnologias Usadas

### Banco de Dados 💾

- [Mongodb](https://www.mongodb.com/pt-br/atlas)

### Back-end ⚙️

- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongodb](https://www.mongodb.com/pt-br/docs/atlas/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Jest](https://jestjs.io/pt-BR/)
- [Docker](https://www.docker.com/)

### Back-end ⚙️

- [React](https://react.dev/learn)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

</details>

# 💡 Referências a outros projetos 💡

Neste projeto foram utilizados recursos e sintaxe de código inspirados em outros projetos pessoais que já fiz:

- 🟨 [Coach da Depressão](https://github.com/fernandosenacruz/CDD_back-end): API de estudos com finalidade lúdica

- 🟨 [Desafio arrow-digital](https://github.com/fernandosenacruz/backend-challenger-arrow-digital): Api criada para listar as threads hot no subreddit artificial
