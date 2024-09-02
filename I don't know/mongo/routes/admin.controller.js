const express = require('express');
const adminMiddleware = require('../middlewares/admin');
const {Admin , Course} = require('../models/schema');
const jwt = require('jsonwebtoken');
const zod = require('zod');
async function signup_post(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const exist = await Admin.findOne({username : username});
    if(exist){
        return res.status(400).json({
            msg: "admin already exist",
        })
    }
    const admin = await Admin.create({
        username,
        email,
        password,
    })
    if(admin){
        return res.status(200).json({admin: admin._id})
    }
    else{
        res.status(400).json({
            msg: "don't be mean"
        })
    }

    

}


const c = zod.object({
    title: zod.string(),
    description: zod.string(),
    image: zod.string(),
    price: zod.number(),
})


async function course_post(req,res){
    const rep = c.safeParse(req.body);
    if(!rep.success){
        return res.status(400).json({
            msg: "highly bad request"
        })
    }
    const title  = req.body.title;
    const description  = req.body.description;
    const exist = await Course.findOne({title : title});
    if(exist){
        return res.status(400).json({
            msg: "course already exist",
        })
    }
    const image  = req.body.image;
    const price  = req.body.price;
    const course = await Course.create({
        title,
        description,
        image,
        price,
    });
    if(course){
        return res.status(200).json({course: course._id});
    }
    else{
        return res.status(400).json({
            msg: "something wrong with the server"
        })
    }
    
    
}
async function course_get(req,res){
    const r  = await Course.find({});
    return res.status(200).json({courses: r});
}

async function signin(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.findOne({username});
    if(!admin){
        res.status(400).josn({
            msg: "user does not exist"
        })
    }
    const token = jwt.sign({
        username
    },process.env.JWT_SECRET);
    return res.json({
        token
    })

}


module.exports = {
    signup_post,
    course_post,
    course_get,
    signin,
}