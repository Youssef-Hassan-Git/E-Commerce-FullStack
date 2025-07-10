const express = require("express");
const router = express.Router();
const { addAboutUs, updateAboutUs, getAboutUs , deleteAboutUs} = require("../controllers/aboutus.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");


router.post("/", authenticate, authorize("admin"), addAboutUs)
router.put("/:aboutId", authenticate, authorize("admin"), updateAboutUs);
router.get("/", getAboutUs)
router.patch("/:aboutId", authenticate, authorize("admin"), deleteAboutUs);

module.exports = router;
