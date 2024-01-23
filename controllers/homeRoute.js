const router = require("express").Router();
const { Review, User, Game } = require("../models");
const withAuth = require("../utils/auth");

// Get all reviews and join with user data
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll();

    // Serialize data so the template can read it
    const games = gameData.map((game) => game.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      games,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific review by ID
router.get("/review/:id", async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const review = reviewData.get({ plain: true });

    res.render("review", {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/game/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);

    const games = gameData.get({ plain: true });

    const reviewData = await Review.findAll({
      where: {
        game_id: req.params.id
       }
      });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
      console.log({
        ...games,
        ...reviews,
        logged_in: req.session.logged_in
      });
    res.render('gamepage', {
      ...games,
      reviews,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the profile page for the logged-in user
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the profile page
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the profile page
  // if (req.session.logged_in) {
  //   res.redirect("/profile");
  //   return;
  // }

  res.render("signup");
});

module.exports = router;
