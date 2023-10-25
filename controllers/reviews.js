const Review = require("../models/review");
const Campground = require("../models/campground");

//create
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await campground.save();
  await review.save();
  // req.flash(
  //   "success",
  //   `You have successfully created a new review for '${campground.title}'`
  // );
  res.redirect(`/campgrounds/${campground._id}`);
};

//delete
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  // req.flash("success", `You have successfully DELETED your review.`);
  res.redirect(`/campgrounds/${id}`);
};
