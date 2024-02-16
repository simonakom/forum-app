const express = require("express");
const router = express.Router();
const CommentModel = require("../models/comments");
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const validate = require("../utils/validation/commentValidation");

//------------------------------------------------- get all comments of all posts------------------------------------------------------//
router.get ("/", async (req,res) => { 
    const comments = await CommentModel.find({});
    res.status(200).json (comments); //http://localhost:3000/api/comment/
})

//------------------------------------------------- get comments by postId------------------------------------------------------//
 router.get ("/post/:postId", async (req,res) => {  
    try {
        const comments = await CommentModel.find({post: req.params.postId});
        res.status(200).json ({comments}); //http://localhost:3000/api/comment/post/65c2769e429ff20b9f2103cb

    } catch (err) {
        res.redirect ("/?error=Post was not found")
        // res.status(400).json({ message: "Postas buvo nerastas" });
    }
});

//------------------------------------------------- get comments by userId------------------------------------------------------//
router.get ("/user/:userId", async (req,res) => { 
    try {
        const comments = await CommentModel.find({author: req.params.userId});
        res.status(200).json ({comments});
    } catch (err) {
        res.redirect ("/?error=User was not found") //http://localhost:3000/api/comment/user/65c27680429ff20b9f2103c8
        // res.status(400).json({ message: "Vartotojas buvo nerastas" });
    }
})

//----------------------------------------------------- create comments ------------------------------------------------------------//

router.post ("/:postId", async (req,res) => {  //http:localhost:3000/post/65c2773a429ff20b9f2103ea
    // const content = req.body.content;
    try {
        // console.log("Veikiu");
        const { content } = req.body; //const content = req.body.content; //pavadinimas "content" turi atitinkti form name
        // console.log(req.params.postId);
        const post = await PostModel.findOne({ _id: req.params.postId });
        if (!req.session.user?.loggedIn) {
            res.redirect ("/?error=Please log in to comment")
        }  

        // Validation      
        if (!content ) {
            return res.redirect(`/post/${req.params.postId}?error=Please, fill all fields!!`);
        }
        const validationResult = validate(req.body)
        if (validationResult !== "Successfully registered!") {
            return res.redirect("/post/${req.params.postId}?error=" + validationResult);
        }
 
        const newComment = new CommentModel({
			content,
			author: req.session.user.id,
			post: req.params.postId,
		});
		await newComment.save();

		//Komentarų skaičiaus inkrementas post'e turint dokumentą iš DB
		post.commentsCount++;
        post.lastComment = Date.now() + 1000 * 60 * 60 * 2; // +2 valandos pagal laiko zoną
		post.lastCommentBy = req.session.user.id;
		post.save();

		//Komentarų skaičiaus inkrementas user'yje neturint dokumento iš DB
        // 1. parametras - filtras
		// 2. parametras laukeliai, kuriuos atnaujiname.
		// $inc objektas - inkremento objektas, kuriame nurodome pridedamas prie laukelių reikšmes. Objektas kuris nurodo kokius konkrecius objektus norima keisti (incrementuoti) po viena
		// .exec() - atnaujinimo užklausos išsiuntimas į DB  
    	UserModel.findOneAndUpdate(
			{ _id: req.session.user.id },
			{ $inc: { commentsCount: 1 } }
		).exec();

        res.redirect(`/post/${req.params.postId}?message=Comment was successfully added!`);
} catch (err) {
    console.log(err);
    res.redirect ("/?error=User was not found");
}
})

//---------------------------------------------------- delete comments ------------------------------------------------------------//
router.delete("/:id", async (req, res) => {
});

//---------------------------------------------------- update comments ------------------------------------------------------------//
router.put("/:id", async (req, res) => {
});

module.exports = router;