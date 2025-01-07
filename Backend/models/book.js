const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {  
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        bookType: {  
            type: String,
            required: true,
            enum: [
                "Hardcover", 
                "Paperback", 
                "E-Book", 
                "Audiobook", 
                "Graphic Novel", 
                "Textbook", 
                "Comic Book",
                "Magazine",
                "Journal"
            ],
        },
        condition: {  
            type: String,
            required: true,
            enum: ["New", "Like New", "Good", "Acceptable"],  
        },
        url: {  
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
