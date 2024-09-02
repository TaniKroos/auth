const express = require('express');
const userMiddleware = require('../middlewares/user');
const {User , Course} = require('../models/schema');
const zod = require('zod');
const { model } = require('mongoose');



async function signup_post(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const exist = await User.findOne({username : username});
    if(exist){
        return res.status(400).json({
            msg: "user already exist",
        })
    }
    const user = await User.create({
        username,
        email,
        password,
    })
    if(user){
        return res.status(200).json({user: user._id})
    }
    else{
        res.status(400).json({
            msg: "don't be mean"
        })
    }

    

}


async function course_get(req,res){
    const r  = await Course.find({});
    return res.status(200).json({courses: r});
}

async function pcourse(req,res){
    const id = req.params.id;
    const email = req.headers.email;
    console.log('Hi form pcourse')
    const r = await User.updateOne({
        email,

    },{
        
        "$push":{
            purchasedCourses: id
        }
    });
    return res.json({
        msg: "purchase complete",
    })

}

async function ucourse(req,res){
    const user = await User.findOne({
        email: req.headers.email
    });
    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })
}

module.exports = {
    signup_post,
    course_get,
    pcourse,
    ucourse,
}