const router = require('express').Router();
const { User } = require('../../models');

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const userData = await User.create(req.body);

    // Save the user's session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Send a response with the user data
      res.status(200).json(userData);
    });
  } catch (err) {
    // Send an error response if there was an error creating the user
    res.status(400).json(err);
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    // Find a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no user was found, send an error response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is not valid, send an error response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save the user's session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Send a response with the user data and a success message
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Send an error response if there was an error logging in the user
    res.status(400).json(err);
  }
});

// Route to log out a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the user's session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // Send an error response if the user is not logged in
    res.status(404).end();
  }
});

// Route to delete a user
router.delete('/:id', async (req, res) => {
  try {
    // Delete the user with the provided id
    const userData = await User.destroy({ where: { id: req.params.id } });

    // If no user was found, send an error response
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    // Send a response with a success message
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    // Send an error response if there was an error deleting the user
    res.status(500).json(err);
  }
});

module.exports = router;