const express = require('express');
const { createproduct } = require('../controller/product');
const { requireSignin } = require('../controller/user');
const { adminAuthMiddlware } = require('../middlewares');
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const router = express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/product/create', requireSignin, adminAuthMiddlware, upload.array('producPicture'), createproduct)
    //router.get('/cetagory/getC', fetchCetagory)

module.exports = router