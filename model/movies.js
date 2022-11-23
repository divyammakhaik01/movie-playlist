const mongoose = require('mongoose')


const movies_Schema = new mongoose.Schema({

    Movie_id :{
        type : String
    } ,
    Title : {
        type : String 
    } , 
    Year : {
        type : String
    } ,
    Poster : {
        type : String
    }
    
})

module.exports = mongoose.model("movies" , movies_Schema);