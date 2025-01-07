const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "bookbazar123", (err, user) => {
        if (err) {
            // Handle specific JWT errors
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired. Please sign in again." });
            }
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user; // Attach user information to request
        next();
    });
};

module.exports = { authenticateToken };
