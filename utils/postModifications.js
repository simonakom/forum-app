const PostModel = require("../models/post");
const UserModel = require("../models/user");
async function getPostsWithAuthors() {
	const posts = await PostModel.find({});

	const modifiedPosts = await Promise.all( //kreipiamasi i db kuri grazina prmoisu masyva
		posts.map(async (post) => {
			const userId = post.authorId;
			const user = await UserModel.findOne({ _id: userId });
			const modifiedPost = post.toObject();
			modifiedPost.author = user.username;
			return modifiedPost;
		})
	);

	return modifiedPosts;
}

module.exports = { getPostsWithAuthors };