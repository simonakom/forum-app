//aprasyti post schemai
const mongoose = require("mongoose");

const schema = new mongoose.Schema({  //is mongoose objekto suteikiamos klases "schema" - generuojamas naujas objektas  (paduodamas i konstruktoriu)
    title: {
		type: String,
		minLength: 6,
		maxLength: 150,
		required: true,
	},
	content: {
		type: String,
		minLength: 10,
		required: true,
	},
	anonymousViewsCount: {
		type: Number,
		default: 0,
		required: true,
	},
	viewsCount: {
		type: Number,
		default: 0,
		required: true,
	},
	commentsCount: {
		type: Number,
		default: 0,
		required: true,
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId, //object reference - duomenu tipas skirtas id
		ref: "user", //user model
		required: true,
	},
	likesCount: {
		type: Number,
		default: 0,
		required: true,
	},
	dislikesCount: {
		type: Number,
		default: 0,
		required: true,
	},
	creationDate: {
		type: Number,
		default: new Date(),
	},
	tags: {
		type: Array,
		required: true,
		default: [],
	},
	images: {
		type: Array,
		required: true,
		default: [],
	},
});

const Model = mongoose.model("post", schema);

module.exports = Model;