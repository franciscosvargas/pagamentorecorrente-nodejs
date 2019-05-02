/* Utilizaremos a dependência Express para
facilitar a escrita de métodos separados
que irão atender as solicitações de acesso
as nossas páginas web.*/

const express = require('express')();

/* Para manipular as ações da nossa conta PagSeguro devemos
importar a classe criada no arquivo account.js criado na
pasta controllers. */
const account = require('./controllers/account');

/* Para manipular a classe que controla as ações referentes aos planos
devemos importar a classe criada no arquivo plan.js criado na
pasta controllers. */
const plan = require('./controllers/plan')

/* Antes de realizarmos qualquer ação devemos autenticar a nossa conta
PagSeguro para que seja possível criar e manipular os planos. */
account.authentication();

/* Para criar um novo plano devemos instanciar o metodo create da nossa
classe plan. 

plan.create();
*/

/* A chamada express.get sempre será usada quando quisermos chamar 
uma nova rota de acesso GET á um determinado endereço da nossa
aplicação. Note que ela recebe dois parâmetros, o primeiro "/"
é o endereço a ser acessado a partir de http://localhost/ 
nesse caso, é a rota raiz da aplicação. 

O outro parâmetro é uma arrow function que recebe req e res.
req será o parâmetro que usaremos para tratar a informação referente
à requisição feita e res quanto a resposta que queremos dar ao cliente.

Usando res.sendFile() enviamos um arquivo como resposta para o cliente.*/
express.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

/* Devemos abrir uma porta get para receber as requisições da nossa
aplicação web quando for preciso obter a lista de planos, é similar 
ao passo anterior, só adicionamos o nome da rota após a /.

Assim poderemos receber requisições a partir do endereço:
http://localhost:3001/getplans
*/
express.get('/getplans', async (req, res) => {
    /* Enviaremos a resposta em formato JSON que conterá
    o resultado da chamada do método getPlans() do nosso
    controller de planos. */
    res.json(await plan.getPlans());
});

/* Faz com que os servidor fique escutando requisições HTTP através
da porta indicada pelo serviço de deployment que iremos utilizar
ou atráves da porta 3001 para o localhost.

Note que usamos arrow functions, que é um recurso nativo do javascript
para chamarmos uma função de forma reduzida.*/
express.listen(process.env.PORT || 3001, () => {
    console.log('Servidor iniciado com sucesso.');
});