const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//handle error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
}

// tokens
const mxAge = 1 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt .sign({id} , process.env.JWT_SECRET , {
        expiresIn: mxAge
    });
}




function signup_get (req,res){
    res.render('signup');
}

function login_get (req,res){
    res.render('login');

    // validation errors
   
}

async function signup_post (req,res){
    const { email , password } = req.body;
    try{
        const user = await User.create({
            email,
            password
        })
        const token = createToken(user._id)
        res.cookie('jwt', token , {httpOnly:true , maxAge: mxAge*1000}) 
        return res.status(201).json({user: user._id});
    }catch(err){
        const errors = handleErrors(err)
        return res.status(400).json({errors});
    }
    
}

async function login_post (req,res){
    const {email , password} = req.body;
    console.log(email + password);
    res.send('user login');
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}