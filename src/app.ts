import express from 'express'
import 'express-async-errors'
import router from './routes'
import ErrorMiddleware from './errors/index'


const app = express()

app.use(express.json())
app.use(router)
app.use(ErrorMiddleware)

export default app