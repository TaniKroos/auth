const express = require('express');
const userMiddleware = require('../middlewares/user');
const {signup_post , course_get , pcourse , ucourse , signin} = require('./user.controller');
const { sign } = require('crypto');
const router = express.Router();



router.post('/signup', signup_post);
router.get('/courses', course_get);
router.post('/course/:id', userMiddleware , pcourse)
router.post('/signin',signin)
router.get('/ucourse', ucourse);


module.exports = router;