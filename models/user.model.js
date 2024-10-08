const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator');
const { error } = require('console');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],

        minlength: [8 , 'MIn length is 8 characters']
    },
})

//fire a function after document saved to db
userSchema.post('save', function(doc,next){
    console.log('New User created')
    next();
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user

userSchema.statics.login = async function(email , password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password , user.password)
        if(auth){
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user',userSchema);

module.exports = User;