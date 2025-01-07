const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {  
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/736x/93/e8/d0/93e8d0313894ff752ef1c6970116bad6.jpg"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    cart: [  
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    orders: [  
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        },
    ],
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema); 
