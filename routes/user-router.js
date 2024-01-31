//skirta API, login, registracijos

const express = require("express");
const router = express.Router(); //statine funkcija klaseje express
const UserModel = require("../models/user")
const upload = require("../config/multer.js").upload;
const security = require("../utils/security");


//-------------------------------register----------------------------------//

router.post ("/register", upload.single("img"), async (req, res) => {  //duomenu ikelimas "upload.single ("img")"
    // console.log(req.body);

    const {username, password, birthDate, email, } = req.body; //fields kurios gausime ir paramentrai kuriuos norima itraukti i db
    const fileName = require ("../config/multer.js").lastFileName; //gaunamas ikelto failo pavadinimas registracijos metu
    // console.log(fileName);

    // res.json ({message: "success"}) 

    if (!username || !email || !password || !birthDate) {
       return res.status(400).json({message: "Something is missing...Please, fill all fields"})
    }

    //atlikti salt generavima, kuris bus saugojamas db
    const salt = security.generateSalt(); //grazina salt
    //sugeneruoti vartotojuo slaptazodi ir uzhashuoti
    const hashedPassword = security.hashPassword(password, salt);


    const newUser = new UserModel({ //naujo vartotjo aprasymas
        username, 
        email,
        salt, 
        password: hashedPassword, //saugomas uzkoduotas slaptz.
        birthDate,
        profilePicture: `http://localhost:3000/public/images/${fileName}`,
    });
    await newUser.save(); //kad issaugoti user db

    req.session.user = { //po registracijos  iskarto ivykdomas prijungimas vartotojo prie sistemos tad nustatoma sesija vartotojui
        id: newUser._id,
        loggedIn: true,
        // admin: newUser.admin === "simonak" //jei toks vartotojas, tada priskiriami admin teises
    };       
    // console.log(newUser);
    res.status(200).json ({message: "labas"}); //jei sekmingai ivykdoma - grazinamas user naujas sukurtas objektas
});



//-------------------------------all users----------------------------------//

router.get ("/users", async (req, res) => {
    if(!req.session.user.admin) 
        return res.status(403).json({message: "You are not allowed to"}) //http://localhost:3000/api/user/users
    console.log(req.session.user);

    const users = await UserModel.find({});
    res.status(200).json (users);

})

//-------------------------------log in----------------------------------//


router.post("/login", async (req, res) => {
    const {loginName, password} = req.body;

    const existingUser = loginName.includes("@") 
    ? await UserModel.findOne({email:loginName}) 
    : await UserModel.findOne({username: loginName}) //uzklaustuko nurodoma kas bus jei reiksme true
    if (!existingUser) return res.redirect("/login");

    if(
        !security.isValidCredentials( //tikrinama ar password tinkamas
            password, 
            existingUser.salt,
            existingUser.password
         )
     ) { 
        return res.redirect("/login"); 
    } 

    req.session.user = {  //kai praeijo filtrus, nustatoma sesija 
        id: existingUser._id,
        loggedIn: true,
        admin: existingUser.admin, //
    };    

    // console.log(existingUser);
    res.redirect("/"); //prisijungus perkelti i homepage
});
 
//-------------------------------log out----------------------------------//

router.get("/logout", async (req, res) => {
    if (!req.session.user.loggedIn) {
        res.redirect("/");
    } else {
        req.session.destroy((err) => { //panaikinti sesija
            if (err) {
                return res.redirect("/");
            }
            else {
                res.clearCookie ("connect.sid") //panaikinti cookie
                return res.redirect("/login");
            }
        }); 
    }
});
 

//-------------------------------check session----------------------------------//


router.get("/check-session", async (req, res) => {
	res.json({ message: "will implement in future" });
});



module.exports = router;