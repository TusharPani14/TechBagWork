const express = require("express");
const { buyNowController } = require("../controllers/buyNowController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect,buyNowController);

module.exports = router;
