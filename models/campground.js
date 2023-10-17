const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

//  https://res.cloudinary.com/diwi3pixz/image/upload/w_100/v1697483604/yellcamp/cruraq7wueactbpyycox.jpg
//c_crop,g_face,h_400,w_400/r_max/c_scale,w_200/f_auto/lady.png

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundScema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundScema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundScema);
