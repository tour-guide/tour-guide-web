module.exports = function(sequelize, DataTypes) {
  const Story = sequelize.define("Story", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    rating: {
      // gets average of all the ratings for this story from the ratings table.
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 5
      }
    }
  });
  return Story;
};
