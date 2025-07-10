const express = require("express");
const router = express.Router();
const { addFaq,deActivateFaq, getFaq, activateFaq, getAllFaq } = require("../controllers/faq.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");


router.post("/", authenticate, authorize("admin"), addFaq)
router.patch("/deactivate/:faqId", authenticate, authorize("admin"), deActivateFaq);
router.patch("/activate/:faqId", authenticate, authorize("admin"), activateFaq);
router.get("/", getFaq)
router.get("/getall", getAllFaq)


module.exports = router;
