// When a user inputs more stops on their story, they will create more rows on this table
// Multiple rows might have the same value in storyName, as all the stops belong in the same story.
module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define("Chapter", {
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
    },
    chapAudio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Chapter.associate = models => {
    Chapter.belongsTo(models.Story, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Chapter;
};
