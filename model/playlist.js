const mongoose = require('mongoose')


const playlist_Schema = new mongoose.Schema({

    isPublic : {
        type : Boolean , 
        require : true
    }  ,
    name : {
        type : String
    },
    movies_array : [
        { type: mongoose.Schema.ObjectId, ref: "movies" }
    ]
     ,
    user : {
        type : mongoose.Schema.ObjectId , ref : "user"
    }
    
})

module.exports = mongoose.model("playlist" , playlist_Schema);