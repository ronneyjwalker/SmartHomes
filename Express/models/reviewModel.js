const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    userName: {
      type: String,
    },
    productName: {
      type: String,
    },
    productType: {
      type: String,
    },
    productMaker: {
      type: String,
    },
    reviewRating: {
      type: Number,
    },
    reviewDate: {
      type: Date,
    },
    reviewText: {
      type: String,
    },
    retailerpin: {
      type: String,
    },
    retailercity: {
      type: String,
    },
    userAge: {
      type: String,
    },
    userGender: {
      type: String,
    },
    userOccupation: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewSchema);
