const express = require('express');
const session = require('express-session');
const MongoStore = require ("connect-mongo") //dazniausiai sesijos saugomos serverio atmintyje, o jei app dideles tada db. Modulis kuris ikelia sesijas i db:  npm i connect-mongo. Jo instaliacija: npm i connect-mongo
const pagesRouter = require("../routes/pages") //gaunamas pages.js //naudojamas kaip middleware
const userRouter = require("../routes/user-router"); //gaunamas user-router.js //naudojamas kaip middleware
const postRouter = require("../routes/posts-router");//gaunamas posts-router.js 
const commentRouter = require("../routes/comments-router");//gaunamas posts-router.js 
const bodyParser = require('body-parser');//instaliuoti npm i body-parser: gauna duomenys if frontedn pasinaudojus pacipmis formomis


function config(app) {

//Nustatymas EJS (middleware) aktyvavimui (kad matyti kas yra views folderyje). ejs:embed JavaScript code directly into HTML.
app.set("view engine", "ejs"); 

//Tarpinio route sukurimas: Express router is a middleware and routing system that allows you to group routes.
const publicRouter = express.Router(); 
//Statiniu failu atvaizdavimas per public folderi: Adds middleware to the publicRouter. The express.static middleware is used to serve static files, such as images, CSS files, and JavaScript files. It takes a directory path as an argument, in this case, "public". This means that any request to the publicRouter will check for static files in the "public" directory.
publicRouter.use(express.static("public")); 

app.use(express.json()); //middleware skirtas gauti JSON formato duomenys is kliento


app.use(bodyParser.urlencoded());//bodyParser


app.use(session({ //sesiju nustatymai reikalingi loginui
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({//sesiju saugojimui duomenu bazeje.
        mongoUrl: require("./db-connect").mongoUrl,  //url su kuriuo prisijungiama prie db naudojant sesijas: mongodb+srv://__DB_USER:__DB_PASSWORD@__DB_HOST/__DB_NAME  
        collectionName: "sessions" //db kolecijos pavadinimas saugojimui sesijoms
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // sesija saugojama savaite nuo user atsijungimo
        },
    })
);


//Tarpinio route panaudojimas: http://localhost/public/ --> This line integrates the publicRouter into the main Express application (app). It specifies that any request to the "/public" path should be handled by the publicRouter. The publicRouter is configured to serve static files from the "public" directory.
app.use("/public", publicRouter); 

app.use("/tinymce", express.static("node_modules/tinymce"))

// Routs of pages
app.use (pagesRouter); 


// Routs of user
app.use ("/api/user", userRouter); //kad pasiekti register endpoint: http://localhost:3000/api/user/register
app.use ("/api/post", postRouter);
app.use ("/api/comment", commentRouter);
}



module.exports = {config}; //kad funckija panaudoti app.js. ({config} - su objektu galima daugiau exportuoti funkciju).