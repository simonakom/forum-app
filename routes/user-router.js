//skirta API, login, registracijos

const express = require("express");
const router = express.Router(); //statine funkcija klaseje express
const UserModel = require("../models/user")
const upload = require("../config/multer.js").upload;
const security = require("../utils/security");


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
    await newUser.save(); //kad issaugoti user
    console.log(newUser);
    res.status(200).json (newUser); //jei sekmingai ivykdoma - grazinamas user naujas sukurtas objektas
});

router.get ("/users", async (req, res) => {
    const users = await UserModel.find({_id: "65b6c98271624b01928883d4"});
    res.status(200).json (users);

})

module.exports = router;