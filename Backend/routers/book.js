const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book -- Admin only
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            bookType: req.body.bookType,
            condition: req.body.condition,
            url: req.body.url, 
        });

        await book.save();
        res.status(200).json({ message: "Book added successfully", book });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// update-Books
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers; 

        await Book.findByIdAndUpdate(bookid, {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            bookType: req.body.bookType, 
            condition: req.body.condition,
            url: req.body.url,
        }); 

        // if (!updatedBook) {
        //     return res.status(404).json({ message: "Book not found!" });
        // }

        return res.status(200).json({
            message: "Book Updated successfully!",
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

//delete book 
router.delete("/delete-book",authenticateToken, async (req, res) =>{
    try{
        const {bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message: "Book deleted successfully!",
        });
    }catch (error){
        return res.status(500).json({ message: "An error occured"});
    }
});

//get all books
router.get("/get-all-books", async (req, res) =>{
    try{
        const books = await Book.find().sort({ createAt: -1});
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error){
        return res.status(500).json({ message: "An error occurred"});
    }
});


//get recently added books
router.get("/get-recent-books", async (req, res) =>{
    try{
        const books = await Book.find().sort({ createAt: -1}).limit(8);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error){
        return res.status(500).json({ message: "An error occurred"});
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) =>{
    try{
        const {id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (error){
        return res.status(500).json({ message: "An error occurred"});
    }
});

module.exports = router;
