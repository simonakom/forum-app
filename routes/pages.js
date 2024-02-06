const express = require("express");
const router = express.Router(); //statine funkcija klaseje express
const UserModel = require("../models/user"); //norint dirbti su duomenimis is db (gauti users)
const PostModel = require("../models/post"); //norint dirbti su duomenimis is db (gauti posts)
const postModifications = require("../utils/postModifications")


//------------------------------------------------- home endpoint------------------------------------------------------//
router.get ("/", async (req, res) => { //index.ejs failo atvaizdavimas iš views aplanko

let userData; //variable is declared before the try block,
if (req.session.user?.loggedIn) { // Check if the user is logged in and fetch user data
	try {
		userData = await UserModel.findOne({ _id: req.session.user.id }); 	// console.log("User data:", userData);
	} catch (error) { 
		console.error("Error fetching user data:", error);
	}
}

	const posts = await postModifications.getPostsWithAuthors(); //irasu gavimas is db ir ju modifikavimas

    const config = {
		activeTab: "Home",
        title: "PulpCinemaHub",
        username: userData?.username || null,
        loggedIn:!!req.session.user?.loggedIn, // ? reiksia kad reiksme gali buti ir ne (undefined) kuria vistiek imsime
		message: req.query.message, //is parametru pasiimti zinute //http://localhost:3000/?message=error
		error: req.query.error, 
		posts,
    }

	res.render("index", config); //Kartu paduodami ir parametrai EJS failui
});

//------------------------------------------------- register endpoint------------------------------------------------------//
router.get ("/register", (req, res) => { 
	if (!!req.session.user?.loggedIn) {	//tikrina ar yra prisijunge ir ar bando vistiek  uzeiti i register - jie taip tada redirectins i pgr. puslapi
		return res.redirect("/");
	}
    const config = {
		activeTab: "Register",
		title: "PulpCinemaHub - Registration",
		loggedIn: !!req.session.user?.loggedIn,
		error: req.query.error //http://localhost:3000/register?error=error
	};
	res.render("register", config);//Register routas skirtas registracijai
});

//------------------------------------------------- login endpoint------------------------------------------------------//
router.get("/login", (req, res) => {
	if (!!req.session.user?.loggedIn) {	//tikrina ar yra prisijunge ir ar bando vistiek  uzeiti i login - jie taip tada redirectins i pgr. puslapi
		return res.redirect("/");
	}
	const config = {
		activeTab: "Login",
		title: "PulpCinemaHub - Authentication",
		loggedIn: !!req.session.user?.loggedIn,
		error: req.query.error, //req.query gauna parametrus ir jei jis turi "error"  tada zinute matoma //http://localhost:3000/login?error=hello%20hello
	};
	res.render("login", config); //Login routas skirtas prisijungimui
});

//------------------------------------------------- profile endpoint------------------------------------------------------//

router.get("/my-profile", async (req, res) => {
	if (!req.session.user?.loggedIn) { //tikrinama jei neprisijunges ir jei ne- redirectinamama i login 
		return res.redirect("/login?error=Please, log in first!");
	}
	//gauti duomenys is db ir atvaizduoti profilyje
	const userData = await UserModel.findOne({_id: req.session.user.id}); //_id - nurodoma kokio laukelio ieskome is db 
	console.log(userData);
	
	const config = {
		activeTab: "Profile",
		title: "PulpCinemaHub - My profile",
		profilePhoto: userData.profilePicture,
		loggedIn: !!req.session.user?.loggedIn,
		username: userData.username,
		email: userData.email,
		birthDate: userData.birthDate,
		postsCount: userData.postsCount,
		commentsCount: userData.commentsCount,
		likes: userData.likes,
		dislikes: userData.dislikes
        // admin: userData.admin === "simonak" //jei toks vartotojas, tada priskiriami admin teises

	};
	res.render("profile", config);
});

//------------------------------------------------- post endpoint------------------------------------------------------//

router.get ("/new-post", async (req, res) => { 
	if (!req.session.user?.loggedIn) {  //tikrinama jei neprisijunges ir jei ne- redirectinamama i login 
		return res.redirect("/login?error=Please, log in first!");
	}

		const config = {
			title: "PulpCinemaHub - new post",
			activeTab: "Post",
			loggedIn:!!req.session.user?.loggedIn, 
			error: req.query.error, //http://localhost:3000/new-post?error=error
		}
		res.render("new-post", config); 
	});

//--------------- ---------------------------------- get post by id endpoint------------------------------------------------------//


	router.get("/post/:id", async (req, res) => {
		// if (!req.session.user?.loggedIn) {  //tikrinama jei neprisijunges ir jei ne- redirectinamama i login 
		// 	return res.redirect("/login?error=Please, log in first!");
		// }
		
		try {
			const post = await PostModel.findOne({ _id: req.params.id }).populate("authorId"); //vietoj 2 kreipimosi i db yra vienas, ir nurodoma kad uzpildytu author id
			const config = {
				title: "PulpCinemaHub - post",
				activeTab: "",
				loggedIn: !!req.session.user?.loggedIn,
				post,
				user: post.authorId,
			};
			res.render("post", config);
		} catch (err) {
			res.redirect("/?error=Post not found");
		}
	});
 
	module.exports = router;

//------------------------------------------------- get profile by id endpoint------------------------------------------------------//

// router.get("/profile/:id", async (req, res) => {
// 	const user = await UserModel.find({ _id: req.params.id });
// });