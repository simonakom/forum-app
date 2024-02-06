const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	postDate: {
		type: Date,
		default: Date.now(),
	},

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},

	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "post",
		required: true,
	},

	content: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 4000,
	},

	likesCount: {
		type: Number,
		default: 0,
	},

	dislikesCount: {
		type: Number,
		default: 0,
	},
});

const model = mongoose.model("comment", schema);

module.exports = model;