const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");
const keysecret = "anjalisikarwarsoniasikarwarsonal";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log(token);
        const verifyToken = jwt.verify(token, keysecret);
        console.log(verifyToken);
        
        const rootUser = await UserModel.findOne({_id:verifyToken._id})
        console.log(rootUser);

        if(!rootUser){throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();
       
    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
};

module.exports = auth;
