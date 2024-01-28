const express = require('express');
const pagesRouter = require("../routes/pages") //gaunamas pages.js //naudojamas kaip middleware
const userRouter = require("../routes/user-router") //gaunamas user-router.js //naudojamas kaip middleware


function config(app) {

//Nustatymas EJS (middleware) aktyvavimui (kad matyti kas yra views folderyje). ejs:embed JavaScript code directly into HTML.
app.set("view engine", "ejs"); 

//Tarpinio route sukurimas: Express router is a middleware and routing system that allows you to group routes.
const publicRouter = express.Router(); 
//Statiniu failu atvaizdavimas per public folderi: Adds middleware to the publicRouter. The express.static middleware is used to serve static files, such as images, CSS files, and JavaScript files. It takes a directory path as an argument, in this case, "public". This means that any request to the publicRouter will check for static files in the "public" directory.
publicRouter.use(express.static("public")); 

app.use(express.json()); //middleware skirtas gauti JSON formato duomenys is kliento

//Tarpinio route panaudojimas: http://localhost/public/ --> This line integrates the publicRouter into the main Express application (app). It specifies that any request to the "/public" path should be handled by the publicRouter. The publicRouter is configured to serve static files from the "public" directory.
app.use("/public", publicRouter); 

 
// Routs of pages
app.use (pagesRouter); 
// Routs of user
app.use ("/api/user", userRouter); //kad pasiekti regoster endpoint: http://localhost:3000/api/user/register
}



module.exports = {config}; //kad funckija panaudoti app.js. ({config} - su objektu galima daugiau exportuoti funkciju).