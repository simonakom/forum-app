const express = require ("express"); 
const app = express (); 

require("./config/db-connect").config(); 
require("./config/express-middlewares").config(app); 
 
//-------------------------------------------------------Server---------------------------------------------------//
app.listen (3000, () => {
    console.log ("Server running on port 3000: http://localhost:3000/");
});

 