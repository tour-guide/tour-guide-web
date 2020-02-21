module.exports = function(sequelize, DataTypes) {
  const Ratings = sequelize.define("Ratings", {
    storyID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 5
      }
    }
  });
  return Ratings;
};
