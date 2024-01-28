const express = require ("express"); //1.instaliuoti express biblioteka: npm install express 2. importuoti express biblioteka
const app = express (); //sukuriamas serveris    

require("./config/db-connect").config(); //DB configuracija
require("./config/express-middlewares").config(app); //EJS middleware
 


//-------------------------------------------------------Server---------------------------------------------------//
app.listen (3000, () => {
    console.log ("Server running on port 3000: http://localhost:3000/");
});

 