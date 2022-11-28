const Cart = require('../model/cart')
exports.createcart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) {
            return res.status(400).json({ error })
        }

        if (cart) {
            // return res.status(200).json({ Message: cart })

            Cart.findOneAndUpdate({ user: req.user._id }, {
                "$push": {
                    "cartitems": req.body.cartitems
                }
            }).exec((error, cartt) => {
                if (error) {
                    return res.status(400).json({ error })
                }

                if (cartt) {

                    return res.status(200).json({ cartt })

                }
            })

        } else {
            const cart = new Cart({
                user: req.user._id,
                cartitems: [req.body.cartitems]
            })

            cart.save((error, result) => {
                if (error) {
                    return res.status(400).json({ error })
                }

                if (result) {
                    return res.status(200).json({ result })
                }
            })
        }
    })

}