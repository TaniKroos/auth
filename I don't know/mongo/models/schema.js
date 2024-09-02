const req = require('express/lib/request');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

});

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }]

});

const CourseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String,
    },
    image: String,
    price: Number,

});

const Admin = mongoose.model('Admin',AdminSchema);
const User = mongoose.model('User',UserSchema);
const Course = mongoose.model('Course',CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
}