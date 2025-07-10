const express = require("express");
const router = express.Router();
const { addBrand, getBrands, deleteBrand} = require("../controllers/brand.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");


router.post("/", authenticate, authorize("admin"), addBrand)
router.get("/",  getBrands)
router.patch("/:id", authenticate, authorize("admin"), deleteBrand);

module.exports = router;
