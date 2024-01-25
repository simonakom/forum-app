const express = require ("express");
const mongoose = require ("mongoose"); //kad prisijungti prie duomenu bazes
const app = express (); 

mongoose.connect("mongodb+srv://simonak:ntdpm8YPdulWFpIk@forum.dhm2709.mongodb.net/")
const db = mongoose.connection;//kintamasis bus naudojamas su db

//DB listeners kurie nusako ar pie DB buvo prisijungta sekmingai ar ne
db.on("err", (error) => {
console.error("error: " + error);
})
db.once("open", () => {
    console.info("Successfully connected to database");
})

//Nustatymas EJS aktyvavimui (kad matyti kas yra views folderyje). ejs:embed JavaScript code directly into HTML.
app.set("view engine", "ejs"); 

///middleware: kad gauti static failus is public folderio ir juos pateikti viesai 
const publicRouter = express.Router(); //Express router is a middleware and routing system that allows you to group routes.
publicRouter.use(express.static("public")); //Adds middleware to the publicRouter. The express.static middleware is used to serve static files, such as images, CSS files, and JavaScript files. It takes a directory path as an argument, in this case, "public". This means that any request to the publicRouter will check for static files in the "public" directory.
app.use("/public", publicRouter); //This line integrates the publicRouter into the main Express application (app). It specifies that any request to the "/public" path should be handled by the publicRouter. The publicRouter is configured to serve static files from the "public" directory.

// main endpoint
app.get ("/", (req, res) => {
    res.render("index", {
        title: "PulpCinemaHub",
        username: "simonak",
        list: ["Product1", "Product2", "Milk", "Chocolate"]
    });
});

// register endpoint
app.get ("/register", (req, res) => {
    res.render("register")
});


app.listen (3000, () => {
    console.log ("Server running on port 3000: http://localhost:3000/");
});

