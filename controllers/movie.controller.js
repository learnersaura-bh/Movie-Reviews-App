const Movie = require("../models/movie.model");

async function addRatingAndReviewToMovie(
  movieId,
  userId,
  reviewText,
  userRating,
) {
  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      console.log("Movie not found");
      throw new Error("Movie not found!");
    }

    const ratingAndReviewToAdd = {
      rating: userRating,
      text: reviewText,
      user: userId,
    };

    movie.reviews.push(ratingAndReviewToAdd);

    const updatedMovie = await movie.save();
    console.log("Rating and review added successfully");
    return updatedMovie;
  } catch (error) {
    console.error("Error while adding rating and reviews:", error.message);
    throw new Error("Error while adding rating and reviews: " + error.message);
  }
}

async function getFirstThreeReviewsOfMovie(movieId) {
  try {
    const movie = await Movie.findOne({ _id: movieId }).populate({
      path: "reviews.user",
      select: "username profilePictureUrl",
      options: { limit: 3 },
    });
    if (!movie) {
      console.log("Movie not found");
      throw new Error("Movie not found");
    }
    console.log(`Reviews retrieved for ${movie.title}:`, movie.reviews);

    return movie.reviews;
  } catch (error) {
    console.error("error while retreiving reviews:", error.message);
    throw new Error("error while retreiving reviews:" + error.message);
  }
}

async function getTop5RatingsAndReviews(movieId) {
  try {
    const movie = await Movie.findById(movieId)
      .populate({
        path: "reviews.user",
        select: "username profilePictureUrl",
      })
      .sort({ "reviews.rating": -1 });

    if (!movie) {
      console.log("Movie not found");
      throw new Error("Movie not found");
    }

    const top5Reviews = movie.reviews.slice(0, 5);

    console.log("Top 5 Ratings and Reviews:", top5Reviews);
    return top5Reviews;
  } catch (error) {
    console.error(
      "Error while retrieving top 5 ratings and reviews:",
      error.message,
    );
    throw new Error(
      "Error while retrieving top 5 ratings and reviews:" + error.message,
    );
  }
}

async function getBottom5RatingsAndReviews(movieId) {
  try {
    const movie = await Movie.findById(movieId)
      .populate({
        path: "reviews.user",
        select: "username profilePictureUrl",
      })
      .sort({ "reviews.rating": 1 });

    if (!movie) {
      console.log("Movie not found");
      throw new Error("Movie not found");
    }

    const bottom5Reviews = movie.reviews.slice(0, 5);

    console.log("Bottom 5 Ratings and Reviews:", bottom5Reviews);
    return bottom5Reviews;
  } catch (error) {
    console.error(
      "Error while retrieving bottom 5 ratings and reviews:",
      error.message,
    );
    throw new Error(
      "Error while retrieving bottom 5 ratings and reviews:" + error.message,
    );
  }
}

module.exports = {
  addRatingAndReviewToMovie,
  getFirstThreeReviewsOfMovie,
  getTop5RatingsAndReviews,
  getBottom5RatingsAndReviews,
};
