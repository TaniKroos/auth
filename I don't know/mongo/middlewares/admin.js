
const {Admin} = require('../models/schema')
const jwt = require('jsonwebtoken');

async function adminMiddleware(req,res,next){

    // const email = req.headers.email;
    // const password = req.headers.password;
    // const admin = await Admin.findOne({
    //     email: email,
    //     password: password,
    // })
    // console.log('hi from middleware ' + admin)
    // if(admin){
    //     next();
    // }else{
    //     return res.status(403).json({
    //         msg: "admin doesn't exist"
    //     })
    // }

    const token = req.headers.authorization;
    if(!token){
        return res.status(403).json({
            msg: "You are not authenticated"
        })
    }
    const words = token.split(" ");
    const jwtToken = words[1]
    const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET)

    if(decoded.username){
        next();
    }
    else{
        return res.status(403).json({
            msg: "You are not authenticated"
        })
    }


}

module.exports = adminMiddleware;