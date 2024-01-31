//aprasyti user schemai

const mongoose = require("mongoose");

const schema = new mongoose.Schema({  //is mongoose objekto suteikiamos klases "schema" - generuojamas naujas objektas  (paduodamas i konstruktoriu)
    username: {
        type: String,
        required: true,
        minLenght: 5,
        maxLenght: 50
    },
    email: {
        type: String,
        required: true,
        minLenght: 8,
        maxLenght: 120,
    },
    password: {
        type: String,
        required: true,
        minLenght: 8,
        maxLenght: 120
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
        required: true,
    },
});

const model = mongoose.model("user", schema) //kurdami modeli yra panaudojama schema

module.exports = model;