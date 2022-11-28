const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    offer: {
        type: Number
    },

    pPicture: [
        { img: { type: String } }
    ],

    pquantity: {
        type: Number,
        required: true

    },

    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        review: String
    }],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cetagory',
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    updateAt: Date,



}, { timestamps: true })

module.exports = mongoose.model('product', productSchema)