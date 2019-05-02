const request = require("request");

const credentials = require('../credenciais.json');

class planController {
    /* Método a ser chamado toda vez que queira criar um novo plano */
    create(/* body */) {
        const options = {
            url: `${credentials.sandbox_preaprovals}?email=${credentials.email}&token=${credentials.token_sandbox}`,
            // Url a usada durante a conexão 
            method: 'POST', // Método de conexão HTTP
            headers: {
                'Content-Type': credentials.json_endpoint, // Forma de enviar os dados na requisição
                'email': credentials.email, // Email da sua conta PagSeguro
                'Accept': "application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1 " // Token da sua conta pagseguro

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
}


/* Para que nossa classe seja acessada em outro arquivo
ela deve ser exportada como uma nova instância. */
module.exports = new planController();