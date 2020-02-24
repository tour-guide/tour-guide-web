const slugify = require("slugify");

module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define("Story", {
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
    storyImage: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
  });

  Story.associate = models => {
    Story.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Story.associate = models => {
    Story.hasMany(models.Rating, {
      onDelete: "cascade"
    });
  };

  Story.associate = models => {
    Story.hasMany(models.Chapter, {
      onDelete: "cascade"
    });
  };

  Story.addHook("beforeValidate", Story => {
    Story.slug = slugify(Story.storyName, { lower: true });
    return Story;
  });

  return Story;
};
