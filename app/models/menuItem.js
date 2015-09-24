module.exports = function(sequelize, DataTypes) {
  var MenuItem = sequelize.define("MenuItem", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT()
    },
    price: {
      type: DataTypes.DECIMAL(4, 2)
    },
    section: {
      type: DataTypes.STRING()
    },
    comments: {
      type: DataTypes.TEXT()
    },
    pictureURL: {
      type: DataTypes.STRING(2083)
    }
  }, {
    classMethods: {
      associate: function(models) {
        MenuItem.belongsTo(models.Restaurant, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        MenuItem.belongsToMany(models.User, {through: 'FavoritePlates'});
      }
    }
  }
);
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       User.hasMany(models.Favorite)  USE LATER
  //     }
  //   }
  return MenuItem;
};