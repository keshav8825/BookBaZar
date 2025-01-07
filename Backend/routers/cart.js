const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order")
const { authenticateToken } = require("./userAuth");

// Add to Cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; 

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        // Check if the book is already in the cart
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.status(200).json({
                status: "Success",
                message: "Book is already in the cart",
            });
        }

        // Add the book to the cart
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });

        return res.status(200).json({
            status: "Success",
            message: "Book added to cart successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while adding the book to cart",
            error: error.message,
        });
    }
});


//remove to cart
router.put("/remove-from-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; 

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        // Check if the book is in the cart
        const isBookInCart = userData.cart.includes(bookid);
        if (!isBookInCart) {
            return res.status(400).json({
                status: "Error",
                message: "Book is not in the cart",
            });
        }

        // Remove the book from the cart
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },
        });

        return res.status(200).json({
            status: "Success",
            message: "Book removed from cart successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while removing the book from the cart",
            error: error.message,
        });
    }
});

// Get User Cart
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id)
            .populate({
                path: 'cart',
                model: 'Book',
                select: 'title author price description imageUrl' // Select the fields you want to return
            });

        if (!userData) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        // Reverse the cart order to show newest items first
        const reversedCart = [...userData.cart].reverse();

        return res.status(200).json({
            status: "Success",
            message: "Cart retrieved successfully",
            data: reversedCart,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while retrieving the cart",
            error: error.message,
        });
    }
});
module.exports = router;
