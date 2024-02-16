const mongoose = require ("mongoose"); //kad prisijungti prie duomenu bazes
require("dotenv").config();// Laikinai (kol app nesustoja ar ne-crashina) sukonfiguruoja/perraso .env kintamuosiuis kad jie butu matomi musu kurimo aplinkose.

const mongoUrl = process.env.MONGO_CONNECTION 
.replace("__DB_USER", process.env.DB_USER )
.replace("__DB_PASSWORD", process.env.DB_PASSWORD)
.replace("__DB_HOST", process.env.DB_HOST)
.replace("__DB_NAME", process.env.DB_NAME)

function config() {
// console.log(process.env.A_VARIABLE); - //process.env laiko visus aplinkos kintamuosius.

    // mongoose.connect("mongodb+srv://username:password@forum.dhm2709.mongodb.net/PulpCinemaHub"-serverio prisijungimas prie duomenu bazes pasinaudojant url
    mongoose.connect(mongoUrl);
        
    const db = mongoose.connection;//kintamasis bus naudojamas su db
    
    //DB listeners kurie nusako ar prie DB buvo prisijungta sekmingai ar ne
    db.on("error", (error) => {
    console.error("error: " + error); //ERROR listeneris
    })
    db.once("open", () => {
        console.info("Successfully connected to database");//PRISIJUNGIMO listeneris
    })
}
module.exports = {config, mongoUrl}; //kad funckija panaudoti app.js. ({config} - su objektu galima daugiau exportuoti funkciju).