const express = require('express');
const adminMiddleware = require('../middlewares/admin');
const {signup_post,course_post,course_get , signin} = require('./admin.controller')
const router = express.Router();



router.post('/signup', signup_post);
router.post('/courses',adminMiddleware,course_post);
router.get('/courses',adminMiddleware,course_get);
router.post('/signin',signin);


module.exports = router;