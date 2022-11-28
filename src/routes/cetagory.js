const express = require('express');
const { createCetagory, fetchCetagory } = require('../controller/cetagory');
const { requireSignin } = require('../controller/user');
const { adminAuthMiddlware } = require('../middlewares');
const router = express.Router();

router.post('/cetagory/create', requireSignin, adminAuthMiddlware, createCetagory)
router.get('/cetagory/getC', fetchCetagory)

module.exports = router