const express = require("express");
const router = express.Router();
const { addCategory, getCategories, deleteCategory} = require("../controllers/category.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");


router.post("/", authenticate, authorize("admin"), addCategory)
router.get("/",  getCategories)
router.patch("/:id", authenticate, authorize("admin"), deleteCategory);

module.exports = router;
