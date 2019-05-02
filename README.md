# Aplicação para gerenciamento do módulo Pagamento Recorrente pelo PagSeguro

> Desenvolvido por Francisco Vargas.
> 
O PagSeguro é um serviço online criado e mantido pelo UOL, que disponibiliza ferramentas para processamento de pagamentos na internet tanto no front-end quanto no backend. 

Uma dessas ferramentas é o Pagamento Recorrente, onde o comerciante pode configurar um plano semanal, mensal, ou anual para prover serviços aos seus clientes atráves de suas aplicações web ou mobile. Este serviço é bastante utilizado por sua segurança e credibilidade no mercado.

##  Instalação

O projeto usa o [Node.js](http://nodejs.org/) para rodar o servidor e o [Yarn](https://yarnpkg.com) para gerenciar pacotes utilizados pela aplicação.

> O projeto pode também ter seus pacotes gerenciados pelo NPM, porém aqui, optei pelo yarn por sua velocidade e segurança na instalação e gerenciamento de pacotes. Maaas, fica ao seu critério.

Acompanhe o tutorial de instalação dessas ferramentas com base no seu sistema operacional na página de cada uma.

### Dependências da aplicação
Os pacotes (dependências) que são necessários para o funcionamento da aplicação serão salvos na pasta `node_modules`. Esta pasta não é incluída no repositório e pode ser criada rapidamente com o comando `yarn install`.

## Executando a aplicação 

### Servidor
Podemos iniciar o servidor digitando o comando `node index.js` dentro da pasta do projeto, no seu terminal ou CMD.

No ambiente de desenvolvimento podemos usar também `yarn run dev` que usará o nodemon para re-executar a aplicação a cada salvamento.

### Cliente
Ao iniciar o servidor, você verá no console uma mensagem indicando que o servidor foi iniciado. A partir disso, você poderá acessar pelo seu navegador a partir do endereço [http://localhost:3001](http://localhost:3001).

> 3001 é a minha porta de estimação, você poderá mudar depois se preferir.




