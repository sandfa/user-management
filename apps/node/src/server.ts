import express, { Express } from 'express'
import { connectToMongo } from '../../../packages/mongo/connectToMongo'
require('dotenv').config()
require("dotenv-mono").load()

const app: Express = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const userRouter = require('./userRouter')
app.use('/user', userRouter)

connectToMongo()
app.listen(process.env.PORT_2, () => { console.log('Server running! http://localhost:' + process.env.PORT_2)})
