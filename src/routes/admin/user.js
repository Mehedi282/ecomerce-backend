const express = require('express');
const { signup, signin } = require('../../controller/admin/user');
const { validationForsignup, isvalidated, validationForsigin } = require('../../validators');
const router = express.Router();

router.post('/admin/signup', validationForsignup, isvalidated, signup)
router.post('/admin/signin', validationForsigin, isvalidated, signin)



module.exports = router;