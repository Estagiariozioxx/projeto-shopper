# Serviço de Gerenciamento de Leitura Individualizada de Consumo de Água e Gás

Este projeto é um serviço de back-end desenvolvido para gerenciar a leitura individualizada de consumo de água e gás. Ele permite que os usuários enviem imagens de medidores para serem analisadas por uma IA, gerando medições automáticas, bem como a confirmação e ajuste dessas medições.

## Funcionalidades

- **POST /upload**: Recebe uma imagem em base64, consulta a API Google Gemini para extrair a medida do medidor e retorna o valor lido, um link temporário para a imagem e um GUID.
- **PATCH /confirm**: Permite a confirmação ou correção do valor lido pela IA, salvando o novo valor no banco de dados.
- **GET /<customer_code>/list**: Lista todas as medidas realizadas por um cliente específico, podendo filtrar por tipo de medida (WATER ou GAS).

## Tecnologias Utilizadas

- **Node.js**: Para o desenvolvimento do servidor e endpoints da API REST.
- **TypeScript**: Linguagem de programação para adicionar tipagem estática ao JavaScript.
- **Prisma ORM**: Para gerenciamento do banco de dados.
- **Docker**: Para containerização da aplicação.
- **Google Gemini API**: Para reconhecimento de imagens e extração de dados.

## Pré-requisitos

Antes de começar, certifique-se de ter o Docker e o Docker Compose instalados em seu ambiente. Além disso, você precisará de uma chave de API válida para acessar a API Google Gemini.

## Como Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   
2. **Crie um arquivo .env na raiz do repositório com o seguinte conteúdo:**
   ```env
   GEMINI_API_KEY=<sua_chave_da_api>

Nota: Não compartilhe sua chave pessoal de API.

3. **Suba o ambiente Docker:**
Utilize o comando abaixo para criar e iniciar os contêineres necessários para a aplicação:
   ```bash
   docker-compose up --build
   
Isso construirá e iniciará todos os serviços necessários para a aplicação com um único comando.

3. **Executar os testes automatizados:**
Para executar a suíte de testes e validar a aplicação, utilize o comando:
   ```bash
   yarn test

## Como Usar a Aplicação

**Endpoints da API**

**1. POST /upload**

**Descrição:** Recebe uma imagem de medidor em base64, consulta a API Google Gemini e retorna a medida lida, um link temporário para a imagem e um GUID.

**Exemplo de Requisição:**
```json
{
  "image": "base64",
  "customer_code": "12345",
  "measure_datetime": "2024-08-30T12:34:56Z",
  "measure_type": "WATER"
}


**2.PATCH /confirm**
   
   **Descrição:** Confirma ou corrige o valor lido pela IA.
   
    Exemplo de Requisição:
   
    json
   
    {
      "measure_uuid": "abc123",
      "confirmed_value": 456
    }

3. GET /<customer_code>/list

    Descrição: Lista todas as medidas realizadas por um cliente específico.

    Exemplo de Requisição:

    bash

    /12345/list?measure_type=water

Contribuindo

Se você deseja contribuir com este projeto, sinta-se à vontade para abrir issues ou enviar pull requests. Para grandes mudanças, por favor, abra um problema primeiro para discutir o que você gostaria de mudar.
Licença

Este projeto está licenciado sob a [sua licença] - consulte o arquivo LICENSE para obter detalhes.
