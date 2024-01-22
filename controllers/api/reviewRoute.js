// Import the necessary modules
const router = require("express").Router();
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route to create a new review
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new review with the request body and the user_id from the session
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Send a response with the newly created review
    res.status(200).json(newReview);
  } catch (err) {
    // Send a response with the error if there was an issue creating the review
    res.status(400).json(err);
  }
});

// DELETE route to delete a review by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the review with the specified id and user_id from the session
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no review was found with the specified id, send a response with a 404 status and a message
    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    // Send a response with the deleted review data
    res.status(200).json(reviewData);
  } catch (err) {
    // Send a response with the error if there was an issue deleting the review
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
