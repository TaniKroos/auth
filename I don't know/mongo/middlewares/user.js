const {User} = require('../models/schema')

async function userMiddleware(req,res,next){

    // const email = req.headers.email;
    // const password = req.headers.password;
    // const user = await User.findOne({
    //     email: email,
    //     password: password,
    // })
    // if(user){
    //     next();
    // }else{
    //     return res.status(403).json({
    //         msg: "user doesn't exist"
    //     })
    // }
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1]
    const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET)

    if(decoded.username){
        req.email = decoded.email
        next();
    }
    else{
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

module.exports = userMiddleware;