const request = require("request");

const credentials = require('../credenciais.json');

const parseString = require('xml2js').parseString;

class planController {
	/* Método a ser chamado toda vez que queira criar um novo plano */
	create(/* body */) {

		/* Para realizar a conexão precisamos definir os parâmetros da mesma,
		o PagSeguro exige além da url válida, headers que definirão o tipo de envio
		e a tipo de resposta que iremos receber. 
		
		Os tipos de headers podem ser conferidos na documentação disponibilizada no readme.
		*/

		const options = {
			url: `${credentials.preapprovals_request}?email=${credentials.email}&token=${credentials.token_sandbox}`,

			// Url a usada durante a conexão 
			method: 'POST', // Método de conexão HTTP
			headers: {
				'Content-Type': credentials.json_endpoint, // Indica que iremos enviar os dados em JSON
				'Accept': credentials.accept_json // Indica que queremos receber os dados em JSON

				/* Estamos utilizando o metodo SandBox para execução da aplicação
				em ambiente de testes, para produção, devemos usar uma url e token
				diferente da sandbox. FIQUE ATENTO!*/
			},

			/* Corpo da requisição, o conteúdo do corpo segue a referência da documentação do pagseguro: 
			https://dev.pagseguro.uol.com.br/v2.0.3/reference#api-pagamento-recorrente-criacao-do-plano 
			
			Caso queira receber as informações abaixo atráves da chamada de função,
			é necessário receber o parâmetro na chamada da função e usar da seguinte maneira:
			body: body*/

			body: {
				reference: '01', //Referência única do plano
				preApproval: {
					name: "Plano Mensal", //Nome do Plano
					charge: "AUTO", // Modelo de cobrança recorrente
					period: 'MONTHLY', // Periodicidade da cobranã
					amountPerPayment: 9.99, // Valor da cobrança
					expiration: {
						value: 1, // Número multiplicador
						unit: "YEARS" // Periodo a ser multiplicado
					},
					details: "Descrição do plano", // Descrição do Plano
					cancelURL: "https://htm.yottadev.com.br" // Url caso ocorra o cancelamento do plano
				},
				receiver: {
					email: credentials.email // Email do propietário da conta PagSeguro
				}

			},
			json: true //Habilita o envio do body como JSON
		}

		/* Chamada da requisição que recebe como parâmetro
		o objeto options criado logo acima e uma função de callback
		com o resultado da conexão. */
		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	}

	/* Método chamado sempre que quiser receber a lista de planos da sua conta */
	getPlans(/* data */) {

		/* O objeto data contém duas informações necessárias para encontrar os planos,
		ambas são datas no padrão W3C (exigido pelo PagSeguro). YYYY-MM-DDThh:mm:ss.sTZD

		Com as datas de inicio e fim, definimos um intervalo de tempo e procuramos por planos
		criados nesse intervalo.
		
		O recebimento via parâmetro é possível, porém facultativo
		*/

		const data = {
			startCreationDate: "2019-01-01T00:00:00.45+01:00",
			endCreationDate: "2019-05-06T00:00:00.45+01:00"
		}

		/* Para realizar a conexão precisamos definir os parâmetros da mesma,
		o PagSeguro exige além da url válida, headers que definirão o tipo de envio
		e a tipo de resposta que iremos receber. 
		
		Os tipos de headers podem ser conferidos na documentação disponibilizada no readme.
		*/

		const options = {
			url: `${credentials.preapprovals_request}?email=${credentials.email}&token=${credentials.token_sandbox}&status=ALL&startCreationDate=${data.startCreationDate}&endCreationDate=${data.endCreationDate}`,

			/* Estamos utilizando o metodo SandBox para execução da aplicação
			em ambiente de testes, para produção, devemos usar uma url e token
			diferente da sandbox. FIQUE ATENTO!*/

			// Url a usada durante a conexão 
			method: 'GET', // Método de conexão HTTP
			headers: {
				'Content-Type': credentials.url_endpoint, // Forma de enviar os dados pela URL
				'Accept': credentials.accept_json // Indica que queremos receber a resposta em formato JSON
			},

		}

		/* Iremos retornar uma Promise que será resolvida caso tenhamos obtido 
		os nossos planos com sucesso. */
		return new Promise((resolve, reject) => {
			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				resolve(body);
			});
		});

	}

	/* Método para criação de uma sessão de pagamento */
	async createSession() {
		/* Objeto que define os parâmetros de conexão*/
		const options = {
			url: `${credentials.session}?email=${credentials.email}&token=${credentials.token_sandbox}`,
			/* Url da conexão */
			method: 'POST', // Tipo de requisição
			headers: {
				'Content-Type': credentials.url_endpoint // Indica que iremos enviar os dados na url
			}
		}

		/* Iremos retornar uma Promise que será resolvida caso tenhamos obtido 
		um código de sessão com sucesso */
		return new Promise((resolve) => {
			/* Faz a requisição ao servidor PagSeguro pedindo uma nova chave
			de sessão. */
			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				/* Usa o método parseString para formatar a resposta de XML para JSON */
				parseString(body, function (err, result) {
					// Retorna a chave de sessão
					resolve(result.session.id[0])
				});
			});
		})

	}

	/* Método chamado sempre que houver uma nova adesão de usuário à um plano */
	adherence(data) {

		console.log(data)
		/* Para realizar a conexão precisamos definir os parâmetros da mesma,
		o PagSeguro exige além da url válida, headers que definirão o tipo de envio
		e a tipo de resposta que iremos receber. 
		
		Os tipos de headers podem ser conferidos na documentação disponibilizada no readme.
		*/
		const options = {
			url: `${credentials.preapprovals}?email=${credentials.email}&token=${credentials.token_sandbox}`,

			/* Estamos utilizando o metodo SandBox para execução da aplicação
			em ambiente de testes, para produção, devemos usar uma url e token
			diferente da sandbox. FIQUE ATENTO!*/

			// Url a usada durante a conexão 
			method: 'POST', // Método de conexão HTTP
			body: data,
			headers: {
				'Content-Type': credentials.json_endpoint, // Indica que estamos enviando os dados em formato JSON
				'Accept': credentials.accept_json // Indica que queremos receber a resposta em formato JSON
			},
			json: true
		}

		/* Iremos retornar uma Promise que será resolvida caso tenhamos obtido 
		os nossos planos com sucesso. */
		return new Promise((resolve, reject) => {
			request(options, function (error, response, body) {
				if (error) reject(error);
				console.log(body);
				resolve(body);
			});
		});

	}

	/* Método a ser chamado sempre que for necessário realizar uma cobrança manual */
	manualCharging(/* body */) {
		const options = {
			url: `${credentials.preapprovals_payment}?email=${credentials.email}&token=${credentials.token_sandbox}`,

			/* Estamos utilizando o metodo SandBox para execução da aplicação
			em ambiente de testes, para produção, devemos usar uma url e token
			diferente da sandbox. FIQUE ATENTO!*/

			// Url a usada durante a conexão 
			method: 'POST', // Método de conexão HTTP
			headers: {
				'Content-Type': credentials.json_endpoint, // Forma de enviar os dados pela URL
				'Accept': credentials.accept_json // Indica que queremos receber a resposta em formato JSON
			},

			/* O corpo da mensagem pode e deve ser recebido via parâmetro, use esse corpo
			apenas como formato do objeto a ser utilizado durante a cobrança. */

			body: {
				preApprovalCode: "", // Código de adesão criado no momento de adesão do cliente.
				senderHash: "", // Gerado  por meio do JavaScript do PagSeguro na página cliente.
				items: [{
					id: "", // Código do plano
					description: "", // Descrição do plano
					quantity: 1, // Quantidade
					amount: "1.00" // Preço cobrado no plano
				}]
			},
			json: true

		}

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	}

	cancelAdherence(preApprovalCode) {
		const options = {
			url: `${credentials.preapprovals}/${preApprovalCode}/cancel/?email=${credentials.email}&token=${credentials.token_sandbox}`,

			/* Estamos utilizando o metodo SandBox para execução da aplicação
			em ambiente de testes, para produção, devemos usar uma url e token
			diferente da sandbox. FIQUE ATENTO!*/

			// Url a usada durante a conexão 
			method: 'PUT',
			headers: { 'Accept': credentials.accept_json }// Método de conexão HTTP

		}

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	}

	/* Método a ser chamado sempre que for necessário realizar uma consulta ao estado da
	transação com base na notificação recebida. */
	checkNotification(notificationCode) {
		const options = {
			url: `${credentials.notification_url}/${notificationCode}?email=${credentials.email}&token=${credentials.token_sandbox}`,

			/* Estamos utilizando o metodo SandBox para execução da aplicação
			em ambiente de testes, para produção, devemos usar uma url e token
			diferente da sandbox. FIQUE ATENTO!*/

			// Url a usada durante a conexão 
			method: 'GET',
			headers: {
				'Content-Type': credentials.url_endpoint,
			}
		}

		
		return new Promise((resolve) => {
			/* Faz a requisição GET para o servidor da PagsSeguro
			pedindo as informações da transação. */
			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				/* Transforma a resposta de XML para JSON */
				parseString(body, async function (err, result) {
					resolve(result);
				});
			});
		});


	}

}


/* Para que nossa classe seja acessada em outro arquivo
ela deve ser exportada como uma nova instância. */
module.exports = new planController();