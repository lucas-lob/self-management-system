import express from 'express'

const app = express()

app.get('/users', (req, res) => {
    res.send("Users router")
})

app.listen(3000)