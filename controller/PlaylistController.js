const User = require("../model/user");
const movies = require("../model/movies");
const playlist = require("../model/playlist");
const jwt = require('jsonwebtoken')


const get_playlist_byID = async(req , res) => {

    let p_id  = req.params.p_id;

    if(p_id == ''){
        res.render('error')
        return;
    }
    
    try {

        const response = await playlist.findById(p_id)

        if(!response){
            res.render('error')
            return;
        }

        res.render('playlist' , {
            movies : response.movies_array
        })

        
        
    } catch (error) {
        res.render('error')
    }
}

const get_playlist_byUserID = async(req , res) => {

    let u_id  = req.params.p_id;

    if(u_id == ''){
        res.render('error')
        return;
    }
    
    try {

        const response = await playlist.find();

        if(response.length == 0){
            return res.json({
                "status" : "false" , 
                "error" : "No playlist found !!" 
            })
            // res.render('error' , {
            //     "message" : "No playlist found !!"
            // })
            // return;
        }

        let movie_array = []

        for(let i = 0 ; i < response.length ; i++){
            if(response[i].user._id == u_id){
                movie_array.push(response[i]);
            }
        }

        return res.json({
            "status" : "true" , 
            "data" : movie_array
        })
        
        // res.render('playlist' , {
        //     movies : movie_array
        // })
        
    } catch (error) {

        res.json({
            "status" :"false" ,
            "message" : "server error !!"
        })
        
        // res.render('error' , {
            // "message" : "server error !!"
        // })
    }
    
}

const create_playlist = async (req, res) =>{

    const verify_token = jwt.verify(token , process.env.JWT_SECRET);

    
    const {Movie_id , movie_title , movie_year , movie_poster , isPublic} = req.body ;
    let u_id = verify_token.id;

    try {

        const movie_response = await movies.create(
            {
                Movie_id: Movie_id,
                Title : movie_title , 
                Year : movie_year , 
                Poster : movie_poster
            } 
        ) ; 

        console.log(response);

        // 

        let arr = []

        let data = await playlist.find();

        for(let i = 0 ; i < data.length ; i++){
            data.push(data[i]);
        }
        
        arr.push(movie_response);

        const playlist_response = await playlist.create(
            {
                isPublic :  isPublic, 
                movies_array : arr , 
                user : u_id
            }
        ) ; 

        res.json({
            "status" : "true" , 
            "data" : playlist_response 
        })


        
    } catch (error) {
        res.json({
            "status" : "false"
        })
    }    
    

}

const add_movie = async(req,res) =>{

    const {u_id ,p_id , movie_title , movie_year , movie_poster , isPublic} = req.body ;

    try {

        const movie_response = await movies.create(
            {
                Title : movie_title , 
                Year : movie_year , 
                Poster : movie_poster
            } 
        ) ; 

        console.log(response);

        // 

        let arr = []

        let data = await playlist.findById(p_id);

        for(let i = 0 ; i < data.movies_array.length ; i++){
            arr.push(data.movies_array[i]);
        }
        
        arr.push(movie_response);

        const playlist_response = await playlist.findByIdAndUpdate(p_id, 
            {
                movies_array : arr , 
            }
        ) ; 

        res.json({
            "status" : "true" , 
            "data" : playlist_response 
        })


        
    } catch (error) {
        res.json({
            "status" : "false"
        })
    }    

}

module.exports = {
    get_playlist_byID  , 
    get_playlist_byUserID ,
    create_playlist,
    add_movie
}
