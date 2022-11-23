require("dotenv").config();

const User = require("../model/user");
const movies = require("../model/movies");
const playlist = require("../model/playlist");
const jwt = require('jsonwebtoken')


module.exports = async(req , res , next) => {

    try {

        const token = req.cookies.jwtoken;
        console.log(" : : " , req.cookies , '             ' , token);
        const verify_token = jwt.verify(token , process.env.JWT_SECRET);
        console.log(verify_token);
        next();
    } catch (error) {
        res.json({
            "status" : "false",
            "error" : error
        })
    }

}