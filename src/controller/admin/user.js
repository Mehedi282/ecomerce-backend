const User = require('../../model/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                Message: "Admin already exist"
            })
            const { firstname, lastname, email, password } = req.body

            const _User = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                username: Math.random().toString(),
                role: "admin"
            })

            _User.save((error, data) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({
                        message: "Something wrong occured"
                    })

                }
                if (data) {
                    return res.status(201).json({
                        massage: "Admin is created succesfully"
                    })

                }
            })
        })

}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })

            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    const { _id, firstname, lastname, email, role, fullname } = user;

                    res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstname,
                            lastname,
                            email,
                            role,
                            fullname
                        }
                    })
                } else {
                    res.status(400).json({
                        Message: "Invalid Password"
                    })
                }
            } else {
                res.status(400).json({ Message: "Something went wrong!" })
            }
        })
}

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
}