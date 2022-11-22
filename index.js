require("dotenv").config();

const express = require('express')
const app = express();
const path = require('path')

// database path

const db = require('./config/db')

// routes path
const AuthRoute = require('./routes/auth')
const PlaylistRoute = require('./routes/playlist')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static("./views"));

app.set('views' ,path.join(__dirname , './views'))
app.set('view engine' , 'ejs')



// API's

app.use('/api' , AuthRoute);
app.use('/api' , PlaylistRoute);


// redirect pages 

app.use('/register' , (req,res)=>{
    res.render('register')
});

app.use('/login' , (req,res)=>{
    res.render('login')
});

app.get("/" , (req,res)=>{
    res.render('home')
})

// app.get("/playlist" , (req,res)=>{
//     res.render('home')
// })






const PORT = 8080 || process.env.PORT;


// app.get('/' , (req , res) =>{
    
//     // return res.json({
//     //     "result" : "true",
//     // })
// })

app.listen(PORT , () =>{
    console.log(`server is running at port ${PORT}`) ;
    // initialize  database 
    db() ;
})

// https://www.omdbapi.com/?s=avenger&apikey=f8662fa2