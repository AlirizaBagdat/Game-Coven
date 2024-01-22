const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../models');

// POST route to register a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user using the User model and the request body
    const userData = await User.create(req.body);

    // Log in the new user using Passport.js
    req.login(userData, (err) => {
      if (err) {
        // If there is an error, send a 500 status code and the error message
        res.status(500).json(err);
      } else {
        // If successful, send a 200 status code and the user data
        res.status(200).json(userData);
      }
    });
  } catch (err) {
    // If there is an error, send a 400 status code and the error message
    res.status(400).json(err);
  }
});

// POST route to handle user login using Passport.js
router.post('/login', passport.authenticate('local'), (req, res) => {
  // If authentication is successful, send a JSON response with the user data and a success message
  res.json({ user: req.user, message: 'You are now logged in!' });
});

// POST route to handle user logout
router.post('/logout', (req, res) => {
  // Log out the user
  req.logout();

  // Destroy the session and send a 204 status code
  req.session.destroy(() => {
    res.status(204).end();
  });
});
