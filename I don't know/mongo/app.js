const express = require('express')
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const { mongoConnect } = require('./services/mongo');
require('dotenv').config();
const app = express();
app.use(express.json());


app.use('/admin',adminRouter);
app.use('/user',userRouter);
const PORT = 3000;
app.listen(PORT,async ()=>{
    await mongoConnect();
    console.log('Hi there')
});