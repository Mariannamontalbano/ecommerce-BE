'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    content: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};