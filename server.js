const http = require('http') //API padrão do NODE
const express = require('express') //Trouxemos a funçaõ EXPRESS para o contexto
const bodyParser = require('body-parser') //Trouvemos a função BODY-PARSER para poder manipular objeto JSON a partir do POST

let contador = 3
//Base de dados de clientes para teste
let clientes = [
    {
        id: 1,
        nome: 'João',
        email: 'João@email.com'
    },
    {
        id: 2,
        nome: 'Maria',
        email: 'Maria@email.com'
    }
]

const app = express() //Contruimos um Objeto que chamamos de app
app.use(bodyParser.json())
const porta = 3000 //Definimos a porta
app.set('port', porta) //Configuramos a porta no Objeto APP

//localhost:3000/clientes (POST)
app.post('/clientes', (req, res) => {
    const cliente = {
        id: contador++,
        nome: req.body['nome'],
        email: req.body['email']
    }
    clientes.push(cliente)
    res.status(201).json(clientes)
})

//localhost:3000/clientes (PUT)
app.put('/clientes', (req, res) => {
    const cliente = {
        id: req.body['id'],
        nome: req.body['nome'],
        email: req.body['email']
    }
    let indice = clientes.map(x => x.id).indexOf(req.body['id'])
    clientes.splice(indice, 1, cliente)
    res.status(201).json(clientes)
})

//localhost:3000/clientes (DELETE)
app.delete('/clientes', (req, res) => {
    let indice = clientes.map(x => x.id).indexOf(req.body['id'])
    clientes.splice(indice, 1)
    res.status(201).json(clientes)
})

//localhost:3000/clientes (GET)
app.get('/clientes', (req, res) => {
    res.json(clientes)
})

//localhost:3000/teste (GET)
app.get('/teste', (req, res) => {
    console.log("Passando por aqui...")
    res.send("Olá!")
})


const server = http.createServer(app) //Criamos um servidor entregando para ele o Objeto APP
server.listen(porta) //E colocamos o servidor para atender requisições a partir desse momento (listen --> Aguardando/escutando)