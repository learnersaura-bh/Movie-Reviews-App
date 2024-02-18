const express = require("express");
const {
  addRatingAndReviewToMovie,
  getFirstThreeReviewsOfMovie,
  getTop5RatingsAndReviews,
  getBottom5RatingsAndReviews,
} = require("../controllers/movie.controller");

const movieRouter = express.Router();

movieRouter.post("/:movieId/rating-review", async (req, res) => {
  try {
    const { userId, reviewText, userRating } = req.body;
    const updatedMovie = await addRatingAndReviewToMovie(
      req.params.movieId,
      userId,
      reviewText,
      userRating
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

movieRouter.get("/:movieId/first-three-reviews", async (req, res) => {
  try {
    const reviews = await getFirstThreeReviewsOfMovie(req.params.movieId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

movieRouter.get("/:movieId/top-5-ratings-reviews", async (req, res) => {
  try {
    const reviews = await getTop5RatingsAndReviews(req.params.movieId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

movieRouter.get("/:movieId/bottom-5-ratings-reviews", async (req, res) => {
  try {
    const reviews = await getBottom5RatingsAndReviews(req.params.movieId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = movieRouter;
