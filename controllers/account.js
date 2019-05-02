/* Para armazenar os dados gerados no nosso painel do PagSeguro como:
Token, email, endpoints de apis. Usaremos um arquivo Json e iremos 
instancia-lo abaixo. */
const credentials = require('../credenciais.json')

/* A depedência request é uma facilitadora na hora de realizar
requisições HTTP, como iremos usar ela nesse arquivo, devemos
instancia-la abaixo. */
const request = require('request');

/* Para lidar com os métodos relacionados a maniúlação da conta
do PagSeguro devemos criar uma classe, uma forma organizada e fácil
para chamarmos métodos. */

class accountController {

	/* O método authentication() ficará responsável pela autenticação
	da nossa aplicação no servidor do PagSeguro através de uma conexão
	HTTP. */
	authentication() {
		/* Objeto que define os parâmetros de conexão*/
		const options = {
			url: credentials.sandbox_auth, // Url a usada durante a conexão 
			method: 'GET', // Método de conexão HTTP
			headers: {
				'Content-Type': credentials.url_endpoint, // Forma de enviar os dados na requisição
				'email': credentials.email, // Email da sua conta PagSeguro
				'token-sandbox': credentials.token_sandbox, // Token da sua conta pagseguro

				/* Estamos utilizando o metodo SandBox para execução da aplicação
				em ambiente de testes, para produção, devemos usar uma url e token
				diferente da sandbox. FIQUE ATENTO!*/
			}
		}

		/* Chamada da requisição que recebe como parâmetro
		o objeto options criado logo acima e uma função de callback
		com o resultado da conexão. */
		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			console.log("\nUsuário autenticado com sucesso!");
		});
	}
}


/* Para que nossa classe seja acessada em outro arquivo
ela deve ser exportada como uma nova instância. */
module.exports = new accountController();