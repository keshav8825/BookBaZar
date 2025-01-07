const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

// Sign-up route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Validate required fields
        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Validate password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5 characters" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
        });

        await newUser.save();
        return res.status(200).json({ message: "Signup successful" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// Sign-in route
router.post("/sign-in", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            "bookbazar123", // Use a strong secret key
            { expiresIn: "200d" }
        );

        // Respond with user data and token
        res.status(200).json({
            message: "Sign-in successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

//get-user-information
router.get("/user-information", authenticateToken, async (req, res) =>{
try {
    const { id} = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);

}catch (error){
    res.status(500).json({ message: "Internal server error"});
}
});

//update address
router.put("/update-address", authenticateToken, async (req, res) =>{
    try{
        const { id} = req.headers;
        const { address} = req.body;
        await User.findByIdAndUpdate(id, { address: address});
        return res.status(200).json({message: "Address updated Successfully"});
    }catch (error){
        res.status(500).json({ message: "Internal server error"});
    }
});
module.exports = router;
