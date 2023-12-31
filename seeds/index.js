const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/YELL-CAMP");
  console.log("Database Connected this is from SEEDS");
}

//pick a random element from an array
const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const priceTag = Math.floor(Math.random() * 100) + 15;
    const s = new Campground({
      author: "6527b3a6058d8c2fa4d9e87d",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: "https://res.cloudinary.com/diwi3pixz/image/upload/v1697539176/yellcamp/cgkvx6g6pyzwtrp7csp7.jpg",
          filename: "yellcamp/cgkvx6g6pyzwtrp7csp7",
        },
        {
          url: "https://res.cloudinary.com/diwi3pixz/image/upload/v1697539176/yellcamp/btzlz4omz6kxylsqrefu.jpg",
          filename: "yellcamp/btzlz4omz6kxylsqrefu",
        },
        {
          url: "https://res.cloudinary.com/diwi3pixz/image/upload/v1697539176/yellcamp/hvyecsx5ypya0kldrcqt.jpg",
          filename: "yellcamp/hvyecsx5ypya0kldrcqt",
        },
      ],
      description:
        "Lorem ipsum dolor sit, aunt multum legendum isse, non multa. Aqua vitae. Docendo discimus",
      price: priceTag,
    });
    await s.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
