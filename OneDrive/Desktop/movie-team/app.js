const express = require('express')
const cors = require('cors')
const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')

const app = express()

require('dotenv').config()
require('./config/db')();
app.use(cors({
    origin: '*'
}))


app.use(express.json())


app.get('/',(req,res)=>{
    res.status(200).json("Home Page")
})




app.use('/users', usersRouter)

app.use('/movies', moviesRouter)



app.listen(process.env.PORT , (err)=>{
    err? console.log(err): console.log("Port is on");
})








