import express from 'express'
import { PrismaClient } from "@prisma/client"
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

const port = 3000

// borges
// yBgacQbNPjkzD1xt 

// Colocar ou postar no banco de dados
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})


// listar ou mostrar o que tem no banco de dados 
app.get('/usuarios', async (req, res) => {
    let users = []

    // filtro pelo nome, email ou age
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

// Atualizar no banco de dados
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({

        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})


// Deletar no banco de dados
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({

        where: {
            id: req.params.id
        }
    })

    res.status(200).json('message: "Usuario deletado com SUCESSO!"')
})



app.listen(port, () => {
    console.log(`servidor Rodando na porta: ${port}`)
})