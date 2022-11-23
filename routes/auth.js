const express = require("express");
const router = express.Router();
const AuthController = require('../controller/AuthController');


router.route("/tt").get(function(req,res){
    res.render('homepage');
});
router.route("/login").post(AuthController.login);
router.route("/logout").post(AuthController.logout);
router.route("/register").post(AuthController.register);

router.get('/home_redirect/:user' , (req,res)=>{
    let current_user = req.params.user;
    console.log(req.params);
    console.log("here");
    res.render('home' , {
        user : {
            name : current_user
        }
    })

    
})

module.exports = router;