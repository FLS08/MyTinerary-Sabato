require('dotenv').config()
require('./config/database')
const cors = require('cors')
const express = require('express')

const Router = require('./routes/routes')
const PORT = 4000

const app = express()

//Middlewares

app.use(cors())
app.use(express.json())
app.use('/api', Router)

app.listen(PORT,()=>console.log('Server ready on PORT ' + PORT))

