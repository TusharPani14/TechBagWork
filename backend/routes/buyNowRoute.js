const express = require("express");
const { buyNowController } = require("../controllers/buyNowController");

const router = express.Router();


router.route("/").post(buyNowController)

module.exports = router;
