const User = require("../model/user");
const movies = require("../model/movies");
const playlist = require("../model/playlist");


module.exports = async(req , res , next) => {

    let p_id  = req.query.p_id;
    let u_id = req.query.uid;

    if(!p_id || !u_id )
        res.render('error' , {
            "message" : "p_id or u_id not found !!"
        })
    
    try {
            
        const data = playlist.findById(p_id);

        if(data.isPublic === true){
            
            if(data.user != u_id){
                res.render('error' , {
                    'message' : "Not authorized !!"
                })
            }

        }
        next();
    } catch (error) {
        res.render('error')
    }

}