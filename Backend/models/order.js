// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//     {
//         user: {
//             type: mongoose.Types.ObjectId,
//             ref: "user",
//             required: true,
//         },
//         book: {
//             type: mongoose.Types.ObjectId,
//             ref: "books",
//             required: true,
//         },
//         status: {
//             type: String,
//             default: "Order Placed",
//             enum: ["Order Placed", "Out for Delivery", "Delivered", "Canceled"],
//         },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema); 

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
