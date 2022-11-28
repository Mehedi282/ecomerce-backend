const express = require('express');
const { signup, signin, requireSignin } = require('../controller/user');
const { validationForsigin, validationForsignup, isvalidated } = require('../validators');
const router = express.Router();

router.post('/signup', validationForsignup, isvalidated, signup)
router.post('/signin', validationForsigin, isvalidated, signin)

module.exports = router;