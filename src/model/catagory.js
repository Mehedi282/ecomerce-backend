const mongoose = require('mongoose')
const cetagorySchema = new mongoose.Schema({
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

    parentid: {
        type: String
    }


}, { timestamps: true })

module.exports = mongoose.model('Cetagory', cetagorySchema)