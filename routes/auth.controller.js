const User = require('../models/user.model')

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
        return res.status(201).json(user);
    }catch(err){
        const error = handleErrors(err)
        return res.status(400).send("User not created");
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