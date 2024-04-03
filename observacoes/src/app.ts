import express from 'express'
import { v4 as uuidv4 }  from 'uuid'
const app = express()
app.use(express.json())


/*
a estrutura da base de observações...
{
    "1": [
        {
            "id": "100",
            "texto": "Comprar Açucar"
        },
        {
            "id": "101"
            "texto": "Ver um filme"
        }
    ]
}
*/

interface Observacao{
    id: string;
    texto: string;
}

const observacoes: Record <string, Observacao[]> = {}


//POST /Lembretes/123456/observacoes
app.post('/lembretes/:id/observacoes', (req, res) => {
    //1. gerar id de observação
    const idObs = uuidv4();

    //2. extrair o texto do corpo da requisição
    const { texto } = req.body

    //3. pegar a coleção de observações do lembrete cujo id se encontra na url, caso exista
    //Caso contrário, pego uma coleção nova, vazia.
    const observacoesDoLembrete: Observacao[] = observacoes[req.params.id] || []
    
    
    //4. Na coleção pega no passo anterior, adiciono um novo objeto caracterizado por id e texto
    observacoesDoLembrete.push({id: idObs, texto: texto})
    
    //5. Atualizar o ponteiro na base global para que ele aponte para a nova observacao
    observacoes[req.params.id] = observacoesDoLembrete

    //6. Responder para o cliente com status 201 e entregando a ele a coleção atualizada
    res.status(201).json(observacoesDoLembrete)
})

//GET /lembretes/123456/observacoes
app.get('/lembretes/:id/observacoes', (req,res) => {
    res.json(observacoes[req.params.id] || [])
})

const port = 5000
app.listen(port, () => {
    console.log(`Observações. ${port}`)
})