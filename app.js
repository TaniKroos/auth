const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.route')
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

//db connection
const MONGO_URL = process.env.MONGO_URL;
const dbURI = MONGO_URL;
mongoose.connect(dbURI)
  .then(() =>{
    console.log('Successfully connected to MongoDB');
    app.listen(3000,() =>{
        console.log('Server is running on port 3000')
    })
  })
  .catch(err => console.error(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies')); 
app.use(authRoutes);


