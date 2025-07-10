const express = require("express");
const router = express.Router();
const { addSubCategory, getSubCategories, deleteSubCategory} = require("../controllers/subcategory.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");


router.post("/", authenticate, authorize("admin"), addSubCategory)
router.get("/",  getSubCategories)
router.patch("/:id", authenticate, authorize("admin"), deleteSubCategory);

module.exports = router;
