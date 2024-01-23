// Import Sequelize instance and models
const sequelize = require('../config/connection');
const { Game } = require('../models');

// Import data from JSON files
const gameData = require('./gameData.json');

// Define a function to seed the database
const seedDatabase = async () => {
  // Synchronize the database and force it to drop and recreate tables
  await sequelize.sync({ force: true });

  // Bulk create users using the data from userData.json
  const games = await Game.bulkCreate(gameData);

  // Exit the process after seeding the database
  process.exit(0);
};

// Call the seedDatabase function
seedDatabase();