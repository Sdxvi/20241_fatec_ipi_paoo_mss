import express from 'express'
const app = express()

interface Lembrete{
    id: string;
    texto: string;
}

const lembretes: Record <string, Lembrete> = {}
let id: string = '1'
//get /lembrete obter a coleção de lembretes
app.get('/lembretes', (req, res)=>{
    res.json(lembretes)
})

//post /lembretes cadastrar novo lembrete
app.post('/lembretes', (req, res) => {
    //extrair o texto do corpo da requisição
    const { texto } = req.body
    //construir um novo lembrete
    const lembrete = {id: id, texto: texto}
    //armazenar o novo lembrete
    lembretes[id] = lembrete
    //incrementar o id
    id = (+id + 1).toString()
    //responder ao cliente
    res.json(lembrete)
})



const port = 4000
app.listen(port, () => console.log(`Lembretes. Porta ${port}.`))