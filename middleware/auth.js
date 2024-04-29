const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, "masai", async (err, decode) => {
            if (decode) {
                console.log(decode);
                const userID = decode._id;
                const user = await userModel.findOne({ _id:userID })
                const userrole = user.role;
                req.role = userrole;
                next()
            }
            else {
                res.status(404).send({ msg: "You are not authorise to thi route" })
            }
        });
    }else{
        res.status(404).send({ msg: "please login" })
    }

}

module.exports = {
    auth
}