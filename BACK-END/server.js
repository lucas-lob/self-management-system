import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'

/* 
MONGO DB LOGIN:
lucasmcp23
iJn4AspRDOyg8uMG
*/

const app = express()
app.use(express.json())

const prisma = new PrismaClient()


// USER ROUTERS
app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            pomodoroSettings: {
                create: {}
            }
        }
    })

    res.status(201).json({ "Message": "User created" })
})



app.listen(3000)