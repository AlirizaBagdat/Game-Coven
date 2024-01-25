const User = require('./User');
const Review = require('./Review');
const Game = require('./Game')
User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Review, Game };
