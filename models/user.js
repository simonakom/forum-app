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
});

const model = mongoose.model("user", schema) //kurdami modeli yra panaudojama schema

module.exports = model;