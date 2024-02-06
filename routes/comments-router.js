const express = require("express");
const router = express.Router();
const CommentModel = require("../models/comments");



//gaus visus komentarus is visu postu
router.get ("/", async (req,res) => {
    const comment = await CommentModel.find({});
    res.status(200).json (comment);
})


//gaus visus komentarus pagal post id 
router.get ("/postId", async (req,res) => {

})


//gaus visus komentarus pagal user id 
router.get ("/userId", async (req,res) => {

})


//post: nauju komentaru sukurimas 

//komentaro istrinimas 


module.exports = router;