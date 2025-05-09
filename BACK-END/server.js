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



// POMODORO ROUTERS
app.get('/users/:userId/pomodoro-settings', async (req, res) => {
    const pomodoroSettings = await prisma.pomodoroSettings.findUnique({
        where: {
            userId: req.params.userId
        }
    })

    res.status(200).json({ "Message": "Pomodoro settings obtained" })
})

app.put('/users/:userId/pomodoro-settings', async (req, res) => {
    await prisma.pomodoroSettings.update({
        where: {
            userId: req.params.userId
        },
        data: req.body
    })

    res.status(200).json({ "Message": "Pomodoro settings updated" })
})



app.listen(3000)