import express from 'express'

/* 
MONGO DB LOGIN:
lucasmcp23
iJn4AspRDOyg8uMG
*/

const app = express()

app.get('/users', (req, res) => {
    res.send("Users router")
})

app.listen(3000)