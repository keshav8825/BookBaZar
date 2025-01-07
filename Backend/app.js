const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require('./conn/conn');
const user = require("./routers/user")
const Books= require("./routers/book")
const Favourite = require("./routers/favourite")
const Cart = require("./routers/cart")
const Order = require("./routers/order")

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`);
});
