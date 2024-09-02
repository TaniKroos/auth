
const {Admin} = require('../models/schema')

async function adminMiddleware(req,res,next){

    const email = req.headers.email;
    const password = req.headers.password;
    const admin = await Admin.findOne({
        email: email,
        password: password,
    })
    console.log('hi from middleware ' + admin)
    if(admin){
        next();
    }else{
        return res.status(403).json({
            msg: "admin doesn't exist"
        })
    }
}

module.exports = adminMiddleware;