const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,

    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    hash_password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    contactnumber: {
        type: String
    },

    profilepicture: {
        type: String
    },

}, { timestamps: true })

userSchema.virtual('password')
    .set(function(password) {
        this.hash_password = bcrypt.hashSync(password, 10)
    })

userSchema.virtual('fullname')
    .get(function() {
        return `${this.firstname} ${this.lastname}`
    })


userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hash_password)
    }

}


module.exports = mongoose.model('user', userSchema)