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
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    chapCity: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    chapState:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
<<<<<<< Updated upstream
=======
    },
    chapAudio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    chapLong: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [-90, 90]
      }
    },
    chapLat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [-180, 180]
      }
>>>>>>> Stashed changes
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
