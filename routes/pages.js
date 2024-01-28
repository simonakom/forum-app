const express = require("express");

const router = express.Router(); //statine funkcija klaseje express

// main endpoint
router.get ("/", (req, res) => {
    res.render("index", {
        title: "PulpCinemaHub",
        username: "simonak",
        list: ["Product1", "Product2", "Milk", "Chocolate"]
    });
});

// register endpoint
router.get ("/register", (req, res) => { 
    res.render("register")
});

module.exports = router;