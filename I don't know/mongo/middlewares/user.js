const {User} = require('../models/schema')

async function userMiddleware(req,res,next){

    const email = req.headers.email;
    const password = req.headers.password;
    const user = await User.findOne({
        email: email,
        password: password,
    })
    if(user){
        next();
    }else{
        return res.status(403).json({
            msg: "user doesn't exist"
        })
    }
}

module.exports = userMiddleware;