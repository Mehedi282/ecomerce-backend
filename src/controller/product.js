const Product = require('../model/produc')
const slugify = require('slugify')

exports.createproduct = (req, res) => {
    //res.status(200).json({ file: req.files, body: req.body })

    const { name, price, description, category, pquantity, createdBy } = req.body;
    let pPicture = [];
    if (req.files.length > 0) {
        pPicture = req.files.map(file => {
            return { img: file.filename }
        })
    }


    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        pquantity,
        description,
        pPicture,
        category,
        createdBy: req.user._id
    })

    product.save((error, result) => {
        if (error) {
            return res.status(400).json(error)
        }

        if (result) {
            return res.status(200).json({ result })
        }
    })
}