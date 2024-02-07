//skirta API, login, registracijos

const express = require("express");
const router = express.Router(); //statine funkcija klaseje express
const UserModel = require("../models/user")
const upload = require("../config/multer.js").upload;
const security = require("../utils/security");
const validate = require("../utils/validation/userValidation.js");


//-------------------------------register----------------------------------//

router.post ("/register", upload.single("img"), async (req, res) => {  //duomenu ikelimas "upload.single ("img")"
    try { 
    // console.log(req.body);
    const {username, password, birthDate, email, } = req.body; //fields kurios gausime ir paramentrai kuriuos norima itraukti i db
    const fileName = require ("../config/multer.js").lastFileName; //gaunamas ikelto failo pavadinimas registracijos metu
    // console.log(fileName);

    if (!username || !email || !password || !birthDate) {
       return res.redirect("/register?error=Please, fill all fields !")
    }

    const validationResult = validate(req.body)
    if (validationResult !== "Successfully registered!") { //turi buti toks pats kaip uservalidation.js
        return res.redirect("/register?error=" + validationResult);
    }

    //Patikrinti ar vartotojo username bei email laukeliai yra unikalus:// await UserModel.find({_id: id}) gaunamas masyvas // await UserModel.findOne({_id: id}) gaunamas vienas irasas
         // Check if the username is already taken
         const existingUsername = await UserModel.findOne({ username });
         if (existingUsername) { 
             return res.redirect("/register?error=Username already exists!");
         }
         // Check if the email is already taken
         const existingEmail = await UserModel.findOne({ email });
         if (existingEmail) {
             return res.redirect("/register?error=Email already exists!");
         }


    //atlikti salt generavima, kuris bus saugojamas db
    const salt = security.generateSalt(); //grazina salt
    //sugeneruoti vartotojuo slaptazodi ir uzhashuoti
    const hashedPassword = security.hashPassword(password, salt);

    const newUserObj = { //naujo vartotjo aprasymas
        username, 
        email,
        salt, 
        password: hashedPassword, //saugomas uzkoduotas slaptz.
        birthDate,
        profilePicture: `/public/images/${fileName}`,
    }


    const newUser = new UserModel(newUserObj);
    await newUser.save(); //kad issaugoti user db

    req.session.user = { //po registracijos  iskarto ivykdomas prijungimas vartotojo prie sistemos tad nustatoma sesija vartotojui
        id: newUser._id,
        loggedIn: true,
        // admin: newUser.admin === "simonak" //jei toks vartotojas, tada priskiriami admin teises
    };       
    // console.log(newUser);
    res.redirect("/?message=Successfully registered !"); //jei sekmingai ivykdoma - redirect + grazinamas user naujas sukurtas objektas console.log(newUser);

    } catch (err) {
        console.log(err);
        res.redirect("/register?error=Unsuccessful registration due to incorrect data!");
    }
});


//-------------------------------all users----------------------------------//

router.get ("/users", async (req, res) => {
    if(!req.session.user?.admin) 
        return res.status(403).json({message: "You are not allowed to"}) //http://localhost:3000/api/user/users
    console.log(req.session.user);

    const users = await UserModel.find({});
    res.status(200).json (users);

})

//-------------------------------log in----------------------------------//

router.post("/login", async (req, res) => {
    const {loginName, password} = req.body;

    // validation:
    if (!loginName || !password) {
        return res.redirect("/login?error=Please, fill all fields !");
    }

    const existingUser = loginName.includes("@") 
    ? await UserModel.findOne({email:loginName}) 
    : await UserModel.findOne({username: loginName}) //uzklaustuko nurodoma kas bus jei reiksme true
    // if (!existingUser) return res.redirect("/login");
    if (!existingUser) {
        return res.redirect("/login?error=Invalid username/email !");
    }

    if(
        !security.isValidCredentials( //tikrinama ar password tinkamas
            password, 
            existingUser.salt,
            existingUser.password
         )
     ) { 
        // return res.redirect("/login"); 
                return res.redirect("/login?error=Invalid password !");

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
                console.log ("Error deleting session")
                console.log(err);
                return res.redirect("/");
            }
            else {
                console.log("Successfully logged out");
                res.clearCookie ("connect.sid") //panaikinti cookie
                return res.redirect("/login");
            }
        }); 
    }
});
 

//-------------------------------check session----------------------------------//

// router.get("/check-session", async (req, res) => {
// 	res.json({ message: "will implement in future" });
// });

module.exports = router;