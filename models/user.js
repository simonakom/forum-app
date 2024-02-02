//aprasyti user schemai
const mongoose = require("mongoose");

const schema = new mongoose.Schema({  //is mongoose objekto suteikiamos klases "schema" - generuojamas naujas objektas  (paduodamas i konstruktoriu)
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
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
        required: true,
    },
    registrationDate: { //vartotojui priskirta regitracijos data
        type: Date,
        default: new Date(), 
        required: true,
    }
});

const model = mongoose.model("user", schema) //kurdami modeli yra panaudojama schema

module.exports = model;