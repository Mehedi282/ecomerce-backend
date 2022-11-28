exports.adminAuthMiddlware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ Message: "  Admin Access is not Allowed" })
    }
    next();
}

exports.userAuthMiddlware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ Message: " User Access is not Allowed" })
    }
    next();
}