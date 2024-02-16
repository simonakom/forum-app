const mongoose = require("mongoose");

const schema = new mongoose.Schema({  
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 120
    },
    salt: String,
    birthDate: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    postsCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default : 0,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    registrationDate: { 
        type: Date,
        default: new Date(), 
    },
    profileLikedUsers: [String],
	profileDislikedUsers: [String],
});

const model = mongoose.model("user", schema) 
module.exports = model;