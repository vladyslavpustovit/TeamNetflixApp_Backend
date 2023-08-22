const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        minLength:3,
        maxLength:20,
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

userSchema.plugin(uniqueValidator)

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;

