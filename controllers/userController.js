const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')

const register = async (req, res) => {
    const userInput = req.body;

    try {
        // Check if the username is already taken
        const existingUsername = await userModel.findOne({ username: userInput.username });
        if (existingUsername) {
            return res.status(401).json({
                msg: 'This Username Is Already Taken',
            });
        }

        // Check if the email is already taken
        const existingEmail = await userModel.findOne({ email: userInput.email });
        if (existingEmail) {
            return res.status(401).json({
                msg: 'This Email Address Is Already Signed Up',
            });
        }

        // Encrypt the password
        const encryptPassword = await bcrypt.hash(userInput.password, 12);
        userInput.password = encryptPassword;

        // Create a new user
        const newUser = new userModel(userInput);
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
};


const login = async (req, res) => {
    try {
        // Find the user by username
        const user = await userModel.findOne({ username: req.body.username });

        if (!user) {
            // User not found
            return res.status(401).json({ msg: 'Login/Password is incorrect' });
        }

        // Check if the provided password matches the stored password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            // Password is correct; create a JWT token
            const token = jwt.sign(
                { username: req.body.username, date: new Date().getTime() },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );

            // Send the token as a response
            return res.status(200).json({ username: user.username, token });
        } else {
            // Password is incorrect
            return res.status(401).json({ msg: 'Login/Password is incorrect' });
        }
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


module.exports = {register, login}