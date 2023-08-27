const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')

const register = async (req,res) =>{
    const userInput = req.body 
    let isUser = (await userModel.find({username:userInput.username})).length > 0 ;

    if (!isUser){
        let encryptPassword = await bcrypt.hash(userInput.password , 12);
        userInput.password = encryptPassword;
        let newUser = new userModel(userInput)
        newUser.save()
        .then(data =>{
            res.status(201).json(data)
        })
    }else {
        res.status(200).json({
            msg:'This User Name Is Already Taken'
        })
    }
};





const login = async (req,res) => {
//// checking if the user existing in db database    
let checkUser = await userModel.find({username: req.body.username})

//boolean variable 
let isUserExsit = checkUser.length > 0 

isUserExsit ? await bcrypt.compare(req.body.password , checkUser[0].password) ?
res.status(200).json({
    token:jwt.sign({username: req.body.username, date: new Date().getTime()},
    process.env.JWT_KEY,
    {expiresIn: '1h'}
    )
}) :
res.status(401).json({msg:'Password or Username incorrect'}) :

 res.status(401).json({msg:'User not found'})


}








module.exports = {register, login}