const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Place Order Route
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        // Validate input
        if (!Array.isArray(order) || order.length === 0) {
            return res.status(400).json({
                status: "Error",
                message: "Invalid order data provided.",
            });
        }

        // Find user to verify existence
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        const orderResults = [];

        // Process each order item
        for (const orderData of order) {
            // Create new order
            const newOrder = new Order({
                user: id,
                book: orderData._id,
                quantity: orderData.quantity || 1,
                status: 'pending',
                orderDate: new Date()
            });

            const savedOrder = await newOrder.save();
            orderResults.push(savedOrder._id);

            // Update user's orders and cart
            await User.findByIdAndUpdate(id, {
                $push: { orders: savedOrder._id },
                $pull: { cart: orderData._id }
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Order placed successfully!",
            orderIds: orderResults
        });

    } catch (error) {
        console.error("Error while placing order:", error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while placing the order.",
            error: error.message,
        });
    }
});

// Get Order History of Particular User
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {
                path: "book",
                select: "title author price description imageUrl" // Select specific fields
            }
        });

        if (!userData) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        const orderData = userData.orders.reverse();
        return res.status(200).json({
            status: "Success",
            data: orderData,
        });

    } catch (error) {
        console.error("Error while fetching order history:", error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching the order history",
            error: error.message,
        });
    }
});

// Get All Orders (Admin)
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: "book",
                select: "title author price imageUrl"
            })
            .populate({
                path: "user",
                select: "username email address"
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "Success",
            data: orders
        });

    } catch (error) {
        console.error("Error while fetching all orders:", error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching orders",
            error: error.message,
        });
    }
});

// Update Order Status (Admin)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                status: "Error",
                message: "Status is required"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id, 
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Status Updated Successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error while updating order status:", error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while updating the order status",
            error: error.message,
        });
    }
});

module.exports = router;