const express = require("express");
const router = express.Router();
const {
  getReviews,
  postReviews,
  mostLiked,
  mostSoldZip,
  mostSold,
} = require("../controllers/ReviewController");

router.route("/").get(getReviews).post(postReviews);
router.route("/mostLiked").get(mostLiked);
router.route("/mostSoldZip").get(mostSoldZip);
router.route("/mostSold").get(mostSold);

module.exports = router;
