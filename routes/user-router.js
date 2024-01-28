//skirta API, login, registracijos

const express = require("express");
const router = express.Router(); //statine funkcija klaseje express
const UserModel = require("../models/user")

router.post ("/register", async (req, res) => { 
    const {username, email} = req.body; //username, email - paramentrai kuriuos norima itraukti i db

    if (!username || !email) {
       return res.status(400).json({message: "Something is missing...Please, fill all fields"})
    }
    const newUser = new UserModel({
        username, 
        email
    });
    await newUser.save(); //kad issaugoti user
    res.status(200).json (newUser);
});

router.get ("/users", async (req, res) => {
    const users = await UserModel.find({_id: "65b6c98271624b01928883d4"});
    res.status(200).json (users);

})

module.exports = router;