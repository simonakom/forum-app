const express = require("express");
const router = express.Router();
const PostModel = require("../models/post");
const validate = require("../utils/validation/postValidation");


//------------------------------------------------- get all posts------------------------------------------------------//

router.get("/", async (req, res) => {
	const allPosts = await PostModel.find({});
	res.status(200).json(allPosts);
});

//-------------------------------------------------get post by id -------------------------------------------------------//

router.get("/:id", async (req, res) => {
	//Vieno konkretaus įrašo gavimas
	const post = await PostModel.findOne({ _id: req.params.id }); //Jei neatrandamas, reiksme tampa undefined
	if (!post) { 
		return res.status(404).json({ message: "Post not found" });
	}
	res.status(200).json(post);
});

//-------------------------------------------------delete post -------------------------------------------------------//

router.delete("/:id", async (req, res) => {
	const post = await PostModel.findOne({ _id: req.params.id }); //Jei neatrandamas, reiksme tampa undefined
	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}

	//Jei autorius yra prisijunges vartotojas arba prisijunges vartotojas yra admin, tada leidžiame ištrinti įrašą
	if (post.author === req.session.user.id || req.session.user.admin) {
		await PostModel.findOneAndDelete({ _id: req.params.id }); //atranda irasa ir istrina
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

	if (!title || !content ) {
		return res.redirect("/new-post?error=Please, fill all fields!")
	}

	const validationResult = validate(req.body)
    if (validationResult !== "Successfully registered!") { //turi buti toks pats kaip postvalidation.js
        return res.redirect("/new-post?error=" + validationResult);
    }
 
	// Išsaugojimas duombazėje
	const newPost = new PostModel({
		title,
		content,
		author,
	});

	await newPost.save();
	res.redirect("/?message=New post was successfully created!");
});



//-------------------------------------------------update post -------------------------------------------------------//

router.put("/", async (req, res) => {
});


module.exports = router;