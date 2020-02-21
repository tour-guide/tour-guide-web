// When a user inputs more stops on their story, they will create more rows on this table
// Multiple rows might have the same value in storyName, as all the stops belong in the same story.
module.exports = function(sequelize, DataTypes) {
  const Chapters = sequelize.define("Chapters", {
    storyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chapNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    chapName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    chapLocation: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
  });
  return Chapters;
};
