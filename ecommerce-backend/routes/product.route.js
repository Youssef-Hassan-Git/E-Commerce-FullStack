const express = require("express");
const router = express.Router();
const { addProduct, getProducts, updateProduct, deleteProduct, getProductById, relatedProduct} = require("../controllers/product.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");
const { upload } = require("../middleware/upload.middleware")
const pagination = require("../middleware/pagination.middleware");
const productModel = require("../models/product.model")

router.post("/", authenticate, authorize("admin"), upload.single("img"), addProduct );
router.get("/", pagination(productModel), getProducts);
router.put("/:id", authenticate, authorize("admin"), upload.single("img"), updateProduct);
router.patch("/:id", authenticate, authorize("admin"), deleteProduct);
router.get("/:id", getProductById);
router.get("/related/:id", relatedProduct);

module.exports = router;
