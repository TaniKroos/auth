const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const requireAuth = (req,res,next)=>{
    
    const token = req.cookies.jwt;

    // json webtoken exist and verified
    if(token){
        jwt.verify(token , process.env.JWT_SECRET , (err , decToken) =>{
            if(err){
                res.redirect('/login')
            }else{
                console.log(decToken)
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
    
    next();
}

const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token , process.env.JWT_SECRET ,async (err , decToken) =>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                console.log(decToken)
                let user =await User.findById(decToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
    

}

module.exports = {
    requireAuth,
    checkUser,
}