const express = require("express");
const router = express.Router();
const CommentModel = require("../models/comments");


//------------------------------------------------- get all comments------------------------------------------------------//

router.get ("/", async (req,res) => { //http://localhost:3000/api/comment/
    const comment = await CommentModel.find({});
    res.status(200).json (comment);
})


//------------------------------------------------- get comments by postId------------------------------------------------------//

router.get ("/post/:postId", async (req,res) => { 
})

//------------------------------------------------- get comments by userId------------------------------------------------------//

router.get ("/user/:userId", async (req,res) => { 
})

//---------------------------------------------------- add new comments ------------------------------------------------------------//

//only logged in users?
router.post ("/", async (req,res) => { 
})

//---------------------------------------------------- delete comments ------------------------------------------------------------//

router.delete("/:id", async (req, res) => {
});

//---------------------------------------------------- update comments ------------------------------------------------------------//

router.put("/:id", async (req, res) => {
});


module.exports = router;