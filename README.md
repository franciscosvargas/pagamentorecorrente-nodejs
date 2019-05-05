# Aplicação para gerenciamento do módulo Pagamento Recorrente pelo PagSeguro

  

> Desenvolvido por Francisco Vargas.

>

O PagSeguro é um serviço online criado e mantido pelo UOL, que disponibiliza ferramentas para processamento de pagamentos na internet tanto no front-end quanto no backend.

  

Uma dessas ferramentas é o Pagamento Recorrente, onde o comerciante pode configurar um plano semanal, mensal, ou anual para prover serviços aos seus clientes atráves de suas aplicações web ou mobile. Este serviço é bastante utilizado por sua segurança e credibilidade no mercado.

  

## Instalação

  

O projeto usa o [Node.js](http://nodejs.org/) para rodar o servidor e o [Yarn](https://yarnpkg.com) para gerenciar pacotes utilizados pela aplicação.

  

> O projeto pode também ter seus pacotes gerenciados pelo NPM, porém aqui, optei pelo yarn por sua velocidade e segurança na instalação e gerenciamento de pacotes. Maaas, fica ao seu critério.

  

Acompanhe o tutorial de instalação dessas ferramentas com base no seu sistema operacional na página de cada uma.

  

### Dependências da aplicação

Os pacotes (dependências) que são necessários para o funcionamento da aplicação serão salvos na pasta `node_modules`. Esta pasta não é incluída no repositório e pode ser criada rapidamente com o comando `yarn install`.

## Estrutura da aplicação
Apesar dessa aplicação focar no server-side, trás também uma parte visual para que partes importantes possam ser vistas na prática.

### Lado Servidor
Dentro da nossa aplicação, temos os arquivos `package.json` e `yarn.lock` que guardam as informações sobre as dependências utilizadas.

#### index.js
Index.js é o arquivo principal da nossa aplicação, onde guarda a configuração das requisições HTTP além de chamar os métodos controladores que gerenciam as conexões com o sistema do PagSeguro.

#### credenciais.json
Arquivo JSON que guarda as credenciais e URLS obrigatórias para conexão com o PagSeguro.
> É importante ler a seção Conta PagSeguro e Credenciais logo abaixo para entender a organização do arquivo.

#### controllers/plan.js
O plan.js é um arquivo controlador, ele é o responsável por organizar e gerenciar as informações dos planos existentes ou que ainda serão criados.

### Lado Cliente
#### views/index.html
A pasta views guarda nossos arquivos HTML que serão exibidos ao cliente, um deles é o index.html que é a página inicial da nossa aplicação que mostrará a lista de planos da sua conta.

## Conta PagSeguro e Credenciais
Para o perfeito funcionamento da aplicação é necessário que sejam inseridas algumas credenciais da sua conta de vendedor do PagSeguro.

Caso não tenha uma conta de vendedor [crie uma facilmente](https://cadastro.pagseguro.uol.com.br/) ou mude a sua pessoal para que possa atender o seu negócio.

### Credenciais
As credenciais necessárias basicamente são: um token e email da sua conta de vendedor.

> Nesta aplicação estamos utilizando o modo [SandBox](https://sandbox.pagseguro.uol.com.br) para trabalhar em ambiente de testes, caso queira levar esse projeto para produção é necessário substituir as credenciais e urls sandbox pelas da conta normal.
>Para saber qual usar, veja a [documentação oficial](https://dev.pagseguro.uol.com.br).

#### Obtendo o Token Sandbox
Para obter o token do ambiente de testes acesse o [configurações de vendedor no painel SandBox](https://sandbox.pagseguro.uol.com.br/vendedor/configuracoes.html). Faça login com sua conta PagSeguro padrão, e dentro de PERFIS DE INTEGRAÇÃO > Vendedor,  você encontrará seu email e token para substituir no arquivo credenciais.json.

## Executando a aplicação

  

### Servidor

Podemos iniciar o servidor digitando o comando `node index.js` dentro da pasta do projeto, no seu terminal ou CMD.

  

No ambiente de desenvolvimento podemos usar também `yarn run dev` que usará o nodemon para re-executar a aplicação a cada salvamento.

  

### Cliente

Ao iniciar o servidor, você verá no console uma mensagem indicando que o servidor foi iniciado. A partir disso, você poderá acessar pelo seu navegador a partir do endereço [http://localhost:3001](http://localhost:3001).

  

> 3001 é a minha porta de estimação, você poderá mudar depois se preferir.