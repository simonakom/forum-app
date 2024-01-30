const express = require("express");

const router = express.Router(); //statine funkcija klaseje express



// main endpoint
router.get ("/", (req, res) => { //index.ejs failo atvaizdavimas iš views aplanko

    const config = {
        title: "PulpCinemaHub",
        username: "simonak",
        activeTab: "Home",
        // loggedIn:!!req.session.user?.loggedIn,
    }
	res.render("index", config); //Kartu paduodami ir parametrai EJS failui
});


// register endpoint
router.get ("/register", (req, res) => { 
    const config = {
		activeTab: "Register",
		title: "PulpCinemaHub - Registration",
		// loggedIn: !!req.session.user?.loggedIn,
	};
	res.render("register", config);//Register routas skirtas registracijai
});

// login endpoint

router.get("/login", (req, res) => {
	const config = {
		activeTab: "Login",
		title: "PulpCinemaHub - Authentication",
		// loggedIn: !!req.session.user?.loggedIn,
	};
	res.render("login", config); 	//Login routas skirtas prisijungimui
});

// profile endpoint
router.get("/my-profile", async (req, res) => {
	const config = {
		activeTab: "Profile",
		title: "PulpCinemaHub - My profile",
		profilePhoto: "http://localhost:3000/public/images/img-1706637058117.jpg",
		// loggedIn: !!req.session.user?.loggedIn,
	};
	res.render("profile", config);
});


module.exports = router;