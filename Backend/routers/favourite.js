const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; 
        const userData = await User.findById(id); 

        // Check if the book is already in favourites
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourites." });
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to favourites successfully." });

    } catch (error) {
        // Log the error and send a detailed response
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Remove books from Favourite
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id); 

        // Check if the book is in favourites
        const isBookFavourite = userData.favourites.includes(bookid);
        if (!isBookFavourite) {
            return res.status(400).json({ message: "Book is not in favourites." });
        }

        // Remove the book from favourites
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });

        return res.status(200).json({ message: "Book removed from favourites successfully." });
    } catch (error) {
        // Log the error and send a detailed response
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});



// Get Favourite books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        const userData = await User.findById(id)
            .populate({
                path: 'favourites',
                model: 'Book', 
                select: 'title author price description imageUrl'
            });

        if (!userData) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        return res.status(200).json({
            status: "Success",
            data: userData.favourites,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while retrieving favourite books",
            error: error.message,
        });
    }
});


module.exports = router;
