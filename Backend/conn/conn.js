const mongoose=require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const conn = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection failed", error);
    }
};

conn();