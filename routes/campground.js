const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

//Index
router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

//New
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//Create
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "You have successfully made a new campground");
    res.redirect(`/campgrounds/${campground.id}`);
  })
);

//Show
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
      .populate("reviews")
      .populate("author");
    if (!campground) {
      req.flash("error", "Cannot find that campground");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

//Edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);

//Update
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(
      id,
      req.body.campground
    );
    req.flash(
      "success",
      `You have successfully updated '${campground.title}' campground`
    );
    res.redirect(`/campgrounds/${campground.id}`);
  })
);

//Delete
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    await Campground.findByIdAndDelete(id);
    req.flash("success", `You have successfully DELETED your Campground`);
    res.redirect("/campgrounds");
  })
);

module.exports = router;
