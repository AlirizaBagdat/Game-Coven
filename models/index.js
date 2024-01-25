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

Review.belongsTo(Game, {
  foreignKey: 'game_id',
});

Game.hasMany(Review, {
  foreignKey: 'game_id',
});

module.exports = { User, Review, Game };
