// Import Sequelize instance and models
const sequelize = require('../config/connection');
const { User, Review } = require('../models');

// Import data from JSON files
const userData = require('./userData.json');
const reviewData = require('./reviewData.json');

// Define a function to seed the database
const seedDatabase = async () => {
  // Synchronize the database and force it to drop and recreate tables
  await sequelize.sync({ force: true });

  // Bulk create users using the data from userData.json
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Iterate through each review and associate it with a specific user
  for (let i = 0; i < reviewData.length; i++) {
    const review = reviewData[i];
    const user = users[i % users.length]; // Ensure each review is associated with a specific user

    await Review.create({
      ...review, // Spread the properties of the review object
      userId: user.id, // Associate the review with a specific user
    });
  }

  // Exit the process after seeding the database
  process.exit(0);
};

// Call the seedDatabase function
seedDatabase();
