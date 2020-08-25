const {Router} = require ('express');
const axios = require('axios')


const router = Router();
const Planeta = require('../db/models/planetas');



/** função responsavel por cadastrar um planeta no banco de dados,
 * deve ser enviado um json como o que esta abaixo para a url principal
 * {
 *   "nome":"nome do planeta",
 *   "clima":"clima do planeta",
 *   "terreno":"terreno do planeta"
 * }
 * caso o planeta seja cadastrado com sucesso recebera uma resposta com status 201
 * e os dodos do planeta, incluinto o id
 */
router.post("/",async (req,res)=>{
    
    try{
        const planeta = await Planeta.create(req.body)
        return res.send({planeta}).status = 201;
    }
    catch(e){
        return res.status(400).send({erro:"houve uma falha ao se registrar"})
    }
    
} );



/**função responsavel por buscar o planeta ou os planetas no banco de dados, 
 * a pesquisa pode ser feita pelo nome do planeta ou pelo id do planeta,
 * devem ser enviadas por metodo get para uma das urls abaixo
 */
//localhost:3000?nome={nomeDoPlaneta}
//localhost:3000?id={idDoPlaneta}
router.get('/',async (req,res) => {
    let nome
    let ID
    let planetas = []
    

    //faz uma busca no banco de dados pelo nome do planeta, e retorna uma lista
    if(req.query['nome']){
        nome = req.query['nome']
        planetas = await Planeta.find({nome:nome})

    }

    //faz uma busca no banco de dados pelo id do planeta, e retorna uma lista
    if(req.query['id']){
        ID = req.query['id']
        let planeta = await Planeta.findOne({_id:ID})
        planetas.push(planeta)
    }

    //p é a variavel que contera a lista dos planetas e seus filmes
    let p = []
    /**
     * cria a lista para ser enviada para o frontend com os planetas solicitados,
     * acessa a função getfilmes para verificar os filmes em que o planeta apareceu,
     * caso tenha aparecido em algum filme, envia uma lista com esses filmes,
     * caso não tenha aparecido em nenhum filme, envia uma lista vazia 
     */
    for(let i = 0; i< planetas.length; i++){
        let filmes
        try{
            filmes = await getFilmes(planetas[i]['nome'])
        }catch{
            filmes = []
        }
        
        const pl = {
            id:planetas[i]['_id'],
            nome:planetas[i]['nome'],
            clima:planetas[i]['clima'],
            terreno:planetas[i]['terreno'],
            filmes:filmes
        }
        p.push(pl)
    }
    return res.status(200).send(p)
})


/* função responsavel por deletar os filmes cadastrados,
 * basta enviar o id do planeta para a url informada abaixo
 * via metodo DELETE
 */
//localhost:3000?id={idDoPlaneta}
router.delete("/", async (req,res)=>{
    const id = req.query['id']
    const planeta = await Planeta.deleteOne({_id:id})
    return res.status(200).send()
})



/*
 *função responsavel por verificar se o planeta apareceu em algum filme
 *caso tenha aparecido retorna uma lista com o nome dos filmes, caso não tenha
 *aparecido retorna uma lista vazia
 */
async function  getFilmes(nome){
    //acessa a api e verifica se o filme apareceu em algum filme
    let planeta = await axios.get("https://swapi.dev/api/planets/?search=" + nome);
    let filmes = planeta.data['results'][0]['films']
    let fil = []

    //atribui o nome dos filmes em que o planeta apareceu na variavel fil
    for(let i = 0; i< filmes.length; i++){
        //acessa a api e verifica o no do filme
        const filme = await axios.get(filmes[i])
        fil.push(filme.data['title'])
    }
    return fil
}

module.exports = router


