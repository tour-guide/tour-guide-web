module.exports = function(sequelize, DataTypes) {
  const Rating = sequelize.define("Rating", {

    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    }
  });

  Rating.associate = models => {
    Rating.belongsTo(models.Story, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Rating;
};
