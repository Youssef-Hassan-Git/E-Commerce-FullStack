const express = require("express");
const router = express.Router();
const { addOrder, updateOrder, deleteOrder, getAllOrder, getUserOrder} = require("../controllers/order.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");

router.post("/", authenticate, authorize("user"), addOrder);
router.put("/:id", authenticate, authorize("admin"), updateOrder);
router.patch("/:id", authenticate, authorize("user"), deleteOrder);
router.get("/", authenticate, authorize("admin"), getAllOrder);
router.get("/user", authenticate, authorize("user"), getUserOrder);

module.exports = router; 