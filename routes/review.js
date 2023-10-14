const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review");
const Campground = require("../models/campground");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//Review route show
router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await campground.save();
    await review.save();
    req.flash(
      "success",
      `You have successfully created a new review for '${campground.title}'`
    );
    res.redirect(`/campgrounds/${campground._id}`);
  })
);
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", `You have successfully DELETED your review.`);
  res.redirect(`/campgrounds/${id}`);
});

module.exports = router;
