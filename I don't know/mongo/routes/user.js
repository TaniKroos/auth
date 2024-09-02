const express = require('express');
const userMiddleware = require('../middlewares/user');
const {signup_post , course_get , pcourse , ucourse} = require('./user.controller')
const router = express.Router();



router.post('/signup', signup_post);
router.get('/courses', course_get);
router.post('/course/:id', userMiddleware , pcourse)

router.get('/ucourse', ucourse);


module.exports = router;