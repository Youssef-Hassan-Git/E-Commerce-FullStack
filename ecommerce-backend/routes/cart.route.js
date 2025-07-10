const express = require("express");
const router = express.Router();
const { addToCart, displayUserCart, removeFromCart} = require("../controllers/cart.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");

router.post("/:productId", authenticate, authorize("user"), addToCart);
router.get("/", authenticate, authorize("user"), displayUserCart);
router.patch("/", authenticate, authorize("user"), removeFromCart)

module.exports = router; 