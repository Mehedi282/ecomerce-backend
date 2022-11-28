const cetagory = require('../model/catagory')
const slugify = require('slugify')


function createcetagories(result, parentid = null) {
    const cetagorylist = []
    let category;

    if (parentid == null) {
        category = result.filter(cat => cat.parentid == undefined)
    } else {
        category = result.filter(cat => cat.parentid == parentid)
    }

    for (let cate of category) {
        cetagorylist.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createcetagories(result, cate._id)
        })
    }

    return cetagorylist;
}

exports.createCetagory = (req, res) => {
    const cetagoryobj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if (req.body.parentid) {
        cetagoryobj.parentid = req.body.parentid
    }

    const cat = new cetagory(cetagoryobj);
    cat.save((error, result) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (result) {
            return res.status(201).json({ result })
        }
    })
}

exports.fetchCetagory = (req, res) => {
    cetagory.find({})
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({ error })
            }

            if (result) {

                const cetagorylist = createcetagories(result)
                return res.status(200).json({ cetagorylist })
            }
        })
}
