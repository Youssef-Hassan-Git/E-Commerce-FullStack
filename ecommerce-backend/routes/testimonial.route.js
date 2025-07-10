const express = require("express");
const router = express.Router();
const { addTestimonial, deActivateTestimonial, getTestimonials, activateTestimonial, getAllTestimonials } = require("../controllers/testimonial.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");


router.post("/", authenticate, authorize("user"), addTestimonial)
router.patch("/deactivate/:testimonialId", authenticate, authorize("admin"), deActivateTestimonial);
router.patch("/activate/:testimonialId", authenticate, authorize("admin"), activateTestimonial);
router.get("/", getTestimonials)
router.get("/getall", getAllTestimonials)


module.exports = router;
