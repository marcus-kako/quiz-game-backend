# Quiz_Game_API

## Tecnologias:
 * Express com TypeScript
 * TSC-node
 * mys-ql2

 ## Banco:
 * Mysql -> Desenvolvimento.
 * SupaBase (postgresql) -> em produção.
 
# ENDPOINTS
  ### POST /users 
  ***Recebe um corpo JSON com a seguinte estrutura***
  
*O endpoint deve ser capaz de adicionar um novo user a sua tabela no banco de dados;*

*O corpo da requisição deverá ter o seguinte formato:* <br>

`{` <br>
  `"nickname": "Testaldo Winchester",` <br>
  `"email": "wintes@email.com",` <br>
  `"password": "123456",` <br>
`}` <br>
*O campo nickname deverá ser uma string com no mínimo de 2 caracteres;*

*O campo email será considerado válido se tiver o formato <prefixo>@<domínio> e se for único. Ele é obrigatório.*

*A senha deverá conter de 6 a 15 caracteres. Ela é obrigatória.*

*Caso exista uma pessoa com o mesmo email na base, deve-se retornar o seguinte erro:*

`{
  "message": "Email" already registered"
}`*

*Caso exista uma pessoa com o mesmo nickname na base, deve-se retornar o seguinte erro:*

*`{*
  *"message": "displayName" already exists"*
*}`*
 
### GET /users
 * Lista todos os usuários
###  GET /users/:id
 * Busca um usuário pelo id
### POST /login
 O corpo da requisição deverá ter o seguinte formato: <br>

{ <br>
  "email": "wintes@email.com", <br>
  "password": "123456", <br>
} <br>
 * Caso exista uma consta criada com email e senha correspondentes, será realizado o login, caso não exista, retornará um erro.
### POST /games
 Para Guardar o resultado dos jogos, precisamos das seguintes informações: <br>
 { <br>
	"userId": 5, <br>
	"successes": 8, <br>
	"mistakes": 2, <br>
	"result": true <br>
} <br>
 
 userId será o id do jogador (já logado)
### GET /games/:id
 * Caso o usuáro já tenha jogado algma vez, ele poderá ver o seu histórico, esse endpoint pega o id do jogador por parâmetro, e retorna um array de jogos.

## Como testar:
* Rode *npm install*
* **No arquivo *.env*, configure as variáveis de ambiente para rodar em sua máquina**.
* **Use os comandos** *npm start* **para rodar o build e o node, ou** *npm run dev* **para rodar a aplicação como desenvolviomento usando ts node**

# Repositório Front-End
Aqui está o [Repositório Front-End](https://github.com/AnaLinsDev/quest-app#quest-app).
