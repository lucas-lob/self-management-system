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



app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })

    res.status(201).json({ message: "User created" })
})



app.put('/users/:id', async (req, res) => {
    try {
        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.name,
                email: req.body.email
            }
        })
    } catch {
        res.status(200).json({ message: "User ID not found" })
    }

    res.status(200).json({ message: "User updated" })
})



app.delete('/users/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
    } catch {
        res.status(200).json({ message: "User ID not found" })
    }

    res.status(200).json({ message: "User deleted" })
})



app.listen(3000)