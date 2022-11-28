const express = require('express');
const { createcart } = require('../controller/cart');
const { requireSignin } = require('../controller/user');
const { userAuthMiddlware } = require('../middlewares');
const router = express.Router();

router.post('/cart/create', requireSignin, userAuthMiddlware, createcart)
    //router.get('/cart/getCart', fetchCetagory)

module.exports = router