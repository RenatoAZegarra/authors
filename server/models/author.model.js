// import mongoose to build the model 
const mongoose = require('mongoose');

// the model - the rules the entries need to follow
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minlength: [3, "name must have at least 3 characters"]
    },
    
}, {timestamps: true})

const Product = mongoose.model('Author', AuthorSchema);

module.exports = Product