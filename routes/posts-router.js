const express = require("express");
const router = express.Router();
const PostModel = require("../models/post");
const upload = require("../config/multer").upload;
const validate = require("../utils/validation/postValidation");

router.get("/", async (req, res) => {
	//Visu irasu gavimas
	const allPosts = await PostModel.find({});
	res.status(200).json(allPosts);
});

router.get("/:id", async (req, res) => {
	//Vieno konkretaus įrašo gavimas
	const post = await PostModel.findOne({ _id: req.params.id }); //Jei neatrandamas, reiksme tampa undefined
	if (!post) { 
		return res.status(404).json({ message: "Post not found" });
	}
	res.status(200).json(post);
});

router.delete("/:id", async (req, res) => {
    	//Įrašo ištrynimas
	const post = await PostModel.findOne({ _id: req.params.id }); //Jei neatrandamas, reiksme tampa undefined
	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}

	//Jei autorius yra prisijunges vartotojas arba prisijunges vartotojas yra admin, tada leidžiame ištrinti įrašą
	if (post.authorId === req.session.user.id || req.session.user.admin) {
		await PostModel.findOneAndDelete({ _id: req.params.id }); //atranda irasa ir istrina
		return res.status(200).json({ message: "Post succesfully deleted" });
	} 
	return res
		.status(403)
		.json({ message: "Jūs neturite teisės ištrinti šio įrašo" });
});

router.post("/", async (req, res) => {
	//Naujo įrašo sukūrimas
});

// router.post("/", upload.single("image"), async (req, res) => {
//     // Naujo įrašo sukūrimas

//     try {
//         // Validacijos žingsnis pagal sukurtą validacijos funkciją
//         const validationResult = validate(req.body);
//         if (validationResult.error) {
//             return res.status(400).json({ message: validationResult.error.details[0].message });
//         }

//         const newPost = new PostModel({
//             title: req.body.title,
//             content: req.body.content,
//             authorId: req.session.user.id,
//             // Pridedame failo pavadinimą, kurį grąžina multer middleware
//             imageUrl: req.file ? req.file.filename : null,
//         });

//         await newPost.save();

//         res.status(201).json({ message: "Post created successfully", post: newPost });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


router.put("/", async (req, res) => {
	//Įrašo atnaujinimas
});

// router.put("/:id", async (req, res) => {
//     // Įrašo atnaujinimas

//     try {
//         const post = await PostModel.findOne({ _id: req.params.id });
//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }

//         if (post.authorId !== req.session.user.id && !req.session.user.admin) {
//             return res.status(403).json({ message: "Jūs neturite teisės atnaujinti šio įrašo" });
//         }

//         // Validacijos žingsnis pagal sukurtą validacijos funkciją
//         const validationResult = validate(req.body);
//         if (validationResult.error) {
//             return res.status(400).json({ message: validationResult.error.details[0].message });
//         }

//         post.title = req.body.title;
//         post.content = req.body.content;

//         await post.save();

//         res.status(200).json({ message: "Post updated successfully", post });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

module.exports = router;