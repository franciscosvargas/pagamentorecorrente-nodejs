/* Utilizaremos a dependência Express para
facilitar a escrita de métodos separados
que irão atender as solicitações de acesso
as nossas páginas web.*/

const express = require('express')();


/* A chamada express.get sempre será usada quando quisermos chamar 
uma nova rota de acesso GET á um determinado endereço da nossa
aplicação. Note que ela recebe dois parâmetros, o primeiro "/"
é o endereço a ser acessado a partir de http://localhost/ 
nesse caso, é a rota raiz da aplicação. 

O outro parâmetro é uma arrow function que recebe req e res.
req será o parâmetro que usaremos para tratar a informação referente
à requisição feita e res quanto a resposta que queremos dar ao cliente.

Usando res.send() enviamos uma resposta para o cliente.*/
express.get('/', (req, res) => {
    res.send('Hello World');
});


/* Faz com que os servidor fique escutando requisições HTTP através
da porta indicada pelo serviço de deployment que iremos utilizar
ou atráves da porta 3001 para o localhost.

Note que usamos arrow functions, que é um recurso nativo do javascript
para chamarmos uma função de forma reduzida.*/
express.listen(process.env.PORT || 3001, () => {
    console.log('Servidor iniciado com sucesso.');
});