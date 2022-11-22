const User = require("../model/user");
const movies = require("../model/movies");
const playlist = require("../model/playlist");

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
            res.render('error' , {
                "message" : "No playlist found !!"
            })
            return;
        }

        let movie_array = []

        for(let i = 0 ; i < response.length ; i++){
            if(response[i].user._id == u_id){
                movie_array.push(response[i]);
            }
        }
        
        res.render('playlist' , {
            movies : movie_array
        })

        
        
    } catch (error) {
        res.render('error' , {
            "message" : "server error !!"
        })
    }
    
}

const create_playlist = async (req, res) =>{

    const {u_id , movie_title , movie_year , movie_poster , isPublic} = req.body ;

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

        res.render('playlist' , {
            "status" : "OK" , 
            "data" : playlist_response 
        })


        
    } catch (error) {
        res.render('error')
    }    
    

}




module.exports = {
    get_playlist_byID  , 
    get_playlist_byUserID ,
    create_playlist
}