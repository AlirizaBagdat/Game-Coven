// Import Sequelize instance and models
const sequelize = require('../config/connection');
const { Game, Review, User } = require('../models');

// Import data from JSON files
const gameData = require('./gameData.json');
const reviewData = require('./reviews.json');
const userData = require('./userData.json');

// Define a function to seed the database
const seedDatabase = async () => {
  // Synchronize the database and force it to drop and recreate tables
  await sequelize.sync({ force: true });

  // Bulk create users using the data from userData.json
  const games = await Game.bulkCreate(gameData);
  const users = await User.bulkCreate(userData);
  const review = await Review.bulkCreate(reviewData);

  // Exit the process after seeding the database
  process.exit(0);
};

// Call the seedDatabase function
seedDatabase();