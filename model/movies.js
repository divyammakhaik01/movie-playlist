const mongoose = require('mongoose')


const movies_Schema = new mongoose.Schema({

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