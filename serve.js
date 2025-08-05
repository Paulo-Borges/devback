import express from 'express'

const app = express()
app.use(express.json())
const port = 3000
const users = []


app.post('/usuarios', (req, res) => {
    users.push(req.body)

    res.status(201).json(req.body)
})

app.get('/usuarios', (req, res) => {
    res.status(200).json(users)
})

app.listen(port, () => {
    console.log(`servidor Rodando na porta: ${port}`)
})