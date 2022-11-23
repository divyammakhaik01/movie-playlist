require("dotenv").config();

const express = require('express')
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')

// database path

const db = require('./config/db')

// routes path
const AuthRoute = require('./routes/auth')
const PlaylistRoute = require('./routes/playlist')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(express.static("./views"));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('view engine' , 'ejs')
// app.set('views' ,path.join(__dirname , './views'))
// app.use('/views' , express.static(path.join(__dirname+'/views'))


// API's

app.use('/api' , AuthRoute);
app.use('/api' , PlaylistRoute);

app.post('/test', (req,res)=>{
    console.log("here");
    res.render('homepage')
} )


app.use('/register' , (req,res)=>{
    res.render('register')
});

app.use('/login' , (req,res)=>{
    res.render('login')
});

app.get("/" , (req,res)=>{
    res.render('homepage')
})

app.get("/search_result" , (req,res)=>{
    let data = req.cookies.movies;
    console.log(data);
    if(data === undefined)
        return res.json({
            "data" : "Movie Not Found "
        })
    res.render('playlist' , {
        "data" : JSON.parse(data)
    })
})





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