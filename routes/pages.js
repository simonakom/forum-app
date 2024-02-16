const express = require("express");
const router = express.Router(); 
const UserModel = require("../models/user"); 
const PostModel = require("../models/post"); 
const CommentModel = require("../models/comments");

//------------------------------------------------- home endpoint------------------------------------------------------//
router.get ("/", async (req, res) => { 

let userData; 
if (req.session.user?.loggedIn) {  
	try {
		userData = await UserModel.findOne({ _id: req.session.user.id }); 	
	} catch (error) { 
		console.error("Error fetching user data:", error);
	}
}

	const posts = await PostModel.find({})
	.populate({
		path: "author",
		select: "username email",
	})
	.populate({
		path: "lastCommentBy",
		select: "username",
	});
	
    const config = {
		activeTab: "Home",
        title: "PulpCinemaHub",
        username: userData?.username || null,
        loggedIn:!!req.session.user?.loggedIn, 
		message: req.query.message, 
		error: req.query.error, 
		posts,
    }
	res.render("index", config); 
});

//------------------------------------------------- register endpoint------------------------------------------------------//
router.get ("/register", (req, res) => { 
	if (!!req.session.user?.loggedIn) {	
		return res.redirect("/");
	}
    const config = {
		activeTab: "Register",
		title: "PulpCinemaHub - Registration",
		loggedIn: !!req.session.user?.loggedIn,
		error: req.query.error 
	};
	res.render("register", config);
});

//------------------------------------------------- login endpoint------------------------------------------------------//
router.get("/login", (req, res) => {
	if (!!req.session.user?.loggedIn) {	
	}
	const config = {
		activeTab: "Login",
		title: "PulpCinemaHub - Authentication",
		loggedIn: !!req.session.user?.loggedIn,
		error: req.query.error, 
	};
	res.render("login", config); 
});

//------------------------------------------------- help endpoint------------------------------------------------------//
router.get("/help", async (req, res) => {
	
	const config = {
		activeTab: "Help",
		title: "PulpCinemaHub - Help Center",
		loggedIn: !!req.session.user?.loggedIn,
	};
	res.render("help", config);
});

//------------------------------------------------- profile endpoint------------------------------------------------------//
router.get("/my-profile", async (req, res) => {
	if (!req.session.user?.loggedIn) { 
		return res.redirect("/login?error=Please, log in first!");
	}
	const userData = await UserModel.findOne({_id: req.session.user.id}); 
	
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
	};
	res.render("profile", config);
});

//------------------------------------------------- new post endpoint------------------------------------------------------//
router.get ("/new-post", async (req, res) => { 
	if (!req.session.user?.loggedIn) {  
		return res.redirect("/login?error=Please, log in first!");
	}
		const config = {
			title: "PulpCinemaHub - new post",
			activeTab: "Post",
			loggedIn:!!req.session.user?.loggedIn, 
			error: req.query.error, 
		}
		res.render("new-post", config); 
	});

//------------------------------------------------- get profile by id endpoint------------------------------------------------------//
router.get("/profile/:id", async (req, res) => {
	if (!req.session.user?.loggedIn) { 
		return res.redirect("/login?error=Please, log in first!");
	}

	try {
		const userData = await UserModel.findOne({ _id: req.params.id });
		const config = {
			activeTab: "Profile",
			title: "Fortra - Profile",
			profilePhoto: userData.profilePicture,
			loggedIn: !!req.session.user?.loggedIn,
			username: userData.username,
			email: userData.email,
			birthDate: userData.birthDate,
			postsCount: userData.postsCount,
			commentsCount: userData.commentsCount,
			likes: userData.likes,
			dislikes: userData.dislikes,
			error: req.query.error, 
			id: req.params.id,
		};
		res.render("foreign-profile", config);
	} catch (err) {
		res.redirect("/?error=Profile not found");
	}
});

//------------------------------------------------ get post by id endpoint------------------------------------------------------//
router.get("/post/:id", async (req, res) => {
	try {
		const post = await PostModel.findOne({ _id: req.params.id }).populate("author")

		const comments = await CommentModel.find({ post: req.params.id }).populate({
			path: "author",
            select: "username",
		});
		post.viewsCount++;
		post.save();
 
		// PostModel.findByIdAndUpdate(
			// 	{ _id: req.params.id },
			// 	{
			// 		$inc: { viewsCount: 1 },
			// 	}
			// ).exec();

		const config = {
			title: "PulpCinemaHub - post",
			activeTab: "",
			loggedIn: !!req.session.user?.loggedIn,
			post,
			user: post.author,
			error: req.query.error, 
			message: req.query.message, 
			comments,
		};
		res.render("post", config);
	} catch (err) {
		res.redirect("/?error=Post not found");
	}
});

module.exports = router;

