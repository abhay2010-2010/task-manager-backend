const access = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.role)) {
            res.status(401).send({ message: "you are not authorized to perform this action" })
        } else {
            next()
        }
    }
}
module.exports = {
    access
}