const express = require("express");
const router = express.Router();
const { addFav, getFav, removeFav} = require("../controllers/fav.controller");
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");


router.post("/:productId", authenticate, authorize("user"), addFav)

router.patch("/:productId", authenticate, authorize("user"), removeFav);
router.get("/", authenticate, authorize("user"), getFav)


module.exports = router;
