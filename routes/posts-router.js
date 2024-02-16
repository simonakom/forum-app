const express = require("express");
const router = express.Router();
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const validate = require("../utils/validation/postValidation");

//------------------------------------------------- get all posts------------------------------------------------------//
router.get("/", async (req, res) => { 
	const allPosts = await PostModel.find({});
	res.status(200).json(allPosts);
});

//-------------------------------------------------get post by id -------------------------------------------------------//
router.get("/:id", async (req, res) => { 
	const post = await PostModel.findOne({ _id: req.params.id }); 
	if (!post) { 
		return res.status(404).json({ message: "Post not found" });
	}
	res.status(200).json(post);
});

//-------------------------------------------------delete post -------------------------------------------------------//
router.delete("/:id", async (req, res) => {
	const post = await PostModel.findOne({ _id: req.params.id }); 
	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}

	if (post.author === req.session.user.id || req.session.user.admin) {
		await PostModel.findOneAndDelete({ _id: req.params.id }); 
		return res.status(200).json({ message: "Post succesfully deleted" });
	} 
	return res
		.status(403)
		.json({ message: "Jūs neturite teisės ištrinti šio įrašo" });
});

//-------------------------------------------------post post -------------------------------------------------------//
router.post("/", async (req, res) => {
	const { title, content } = req.body;
	const author = req.session.user.id;

	// Validation
	if (!title || !content ) {
		return res.redirect("/new-post?error=Please, fill all fields!")
	}
	const validationResult = validate(req.body)
    if (validationResult !== "Successfully registered!") { 
        return res.redirect("/new-post?error=" + validationResult);
    }
 
	const newPost = new PostModel({
		title,
		content,
		author,
	});
	UserModel.findOneAndUpdate(
		{_id: author}, 
		{$inc: {postsCount: 1} })
		.exec();

	await newPost.save();
	res.redirect("/?message=New post was successfully created!");
});

//-------------------------------------------------update post -------------------------------------------------------//
router.put("/", async (req, res) => {
});

//------------------------------------------------- like post -------------------------------------------------------//
router.get("/like/:postId", async (req, res) => {
	if (!req.session.user?.loggedIn) {
		return res.status(403).json({ message: "Please, log in first!" });
	}

	const post = await PostModel.findOne({ _id: req.params.postId });
	if (post.postLikedUsers.includes(req.session.user.id)) {
		return res.status(403).json({ message: "You already liked this post!" });
	}

	if (post.postDislikedUsers.includes(req.session.user.id)) {
		post.postDislikedUsers.splice(
			post.postDislikedUsers.findIndex(
				(dislikedUser) => req.session.user.id === dislikedUser
			),
			1
		);
		post.dislikesCount--;
	}

	console.log(req.session.user.id);
	post.postLikedUsers.push(req.session.user.id);
	post.likesCount++;
	await post.save();
	res.status(200).json({ message: "Successfully liked post!" });
});

//------------------------------------------------- dislike post -------------------------------------------------------//
router.get("/dislike/:postId", async (req, res) => {
	if (!req.session.user?.loggedIn) {
		return res.status(403).json({ message: "Please, log in first!" });
	}

	const post = await PostModel.findOne({ _id: req.params.postId });

	if (post.postDislikedUsers.includes(req.session.user.id)) {
		return res.status(403).json({ message: "You already disliked this post!" });
	}

	if (post.postLikedUsers.includes(req.session.user.id)) {
		post.postLikedUsers.splice(
			post.postLikedUsers.findIndex(
				(dislikedUser) => req.session.user.id === dislikedUser
			),
			1
		);
		post.likesCount--;
	}
	post.postDislikedUsers.push(req.session.user.id);
	post.dislikesCount++;
	await post.save();
	res.status(200).json({ message: "Successfully disliked post!" });
});

module.exports = router;