require('dotenv').config()
require('./config/database')
const cors = require('cors')
const express = require('express')
const path = require('path')
const passport = require('./config/passport')

const Router = require('./routes/routes')


const app = express()

//Middlewares

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use('/api', Router)

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{

        res.sendFile(path.join(__dirname+'/client/build/index.html'))
    })
    
}
app.listen(process.env.PORT || 4000,process.env.HOST || '0.0.0.0' ,()=>console.log('Server ready on PORT ' + PORT))
