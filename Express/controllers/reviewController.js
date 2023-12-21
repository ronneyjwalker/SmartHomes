const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");

const getReviews = asyncHandler(async (req, res) => {
  const review = await Review.find();
  res.status(200).json(review);
});

const mostLiked = asyncHandler(async (req, res) => {
  const review = await Review.aggregate()
    .sort({ reviewRating: "desc" })
    .limit(5);
  res.status(200).json(review);
});

const mostSoldZip = asyncHandler(async (req, res) => {
  const review = await Review.aggregate().sortByCount("retailerpin").limit(5);
  res.status(200).json(review);
});

const mostSold = asyncHandler(async (req, res) => {
  const review = await Review.aggregate().sortByCount("productName").limit(5);
  res.status(200).json(review);
});

const postReviews = asyncHandler(async (req, res) => {
  const {
    title,
    userName,
    productName,
    productType,
    productMaker,
    reviewRating,
    reviewDate,
    reviewText,
    retailerpin,
    retailercity,
    userAge,
    userGender,
    userOccupation,
    price,
  } = req.body;

  if (
    !price ||
    !title ||
    !userName ||
    !productName ||
    !productType ||
    !productMaker ||
    !reviewRating ||
    !reviewDate ||
    !reviewText ||
    !retailerpin ||
    !retailercity ||
    !userAge ||
    !userGender ||
    !userOccupation
  ) {
    res.status(400);
    throw new Error("All fields are neccessary!");
  }

  const response = await Review.create({
    title,
    userName,
    productName,
    productType,
    productMaker,
    reviewRating,
    reviewDate,
    reviewText,
    retailerpin,
    retailercity,
    userAge,
    userGender,
    userOccupation,
    price,
  });

  res.status(201).json(response);
});

module.exports = { getReviews, postReviews, mostLiked, mostSoldZip, mostSold };
