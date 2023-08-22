const express = require('express')
const router = express.Router()
const {register, login} = require('../controllers/userController') 
const { model } = require('mongoose')


router.get('/', (req,res)=>{
    res.status(200).json("Users Page")
})

router.post('/register',register)


router.post('/login',login)



module.exports = router
