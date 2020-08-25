<h3>Configurando e Iniciando a aplicação</h3>
Para iniciar a aplicação basta usar o comando npm start.<br>
O programa ira rodar na porta 3000, isso pode ser configurado no arquivo serve.js.<br>
Porem antes da aplicação ser iniciada deve-se configurar a conexão com o banco de dados no arquivo db.js na pasta /src/db.<br>


<h1>Rotas</h1>
<h2>Cadastrar Planetas</h2>
para Cadastrar um novo planaeta utilize a Rota principal da aplicação via metodo POST,
deve ser enviado um arquivo json como o que esta abaixo:<br>
{<br>
&nbsp;"nome":"nome do planeta",<br>
&nbsp;"clima":"clima do planeta",<br>
&nbsp;"terreno":"terreno do planeta"<br>
}<br>

Se tudo ocorrer bem você recebera uma resposta com status 201 e os dados do novo planeta criado, incluindo o id.

<h2>Pesquisar planetas</h2>
Para efetuar a pesquisa de um planeta pelo nome, basta enviar o nome do planeta para a url http://localhost:3000?nome={nomeDoPlaneta}(caso tenha alterado o host, deve substuir o localhost pelo novo host)<br>
<br>
Para efetuar a pesquisa de um planeta pelo id, basta utilizar a seguinte url: http://localhost:3000?id={idDoPlaneta}(caso tenha alterado o host, deve substuir o localhost pelo novo host)<br>
<br>
ambas solicitações devem ser utilizadas via metodo GET.<br>
<br>
Caso o planeta tenha aparecido em algum filme, recebera uma lista com os nomes dos filmes em que ele apareceu.<br>
<br>

<h2>Deletando um planeta</h2>
Para excluir um planeta, utilize a url: htt://localhost:3000?id={idDoPlaneta} utilizando o metodo DELETE, se tudo ocorrer bem, recebera uma resposta vazia com o status 200.<br>

