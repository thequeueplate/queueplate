module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.ENUM,
      values: ['Dine-in', "Take-out"]
    }
  }
  , {
    classMethods: {
      associate: function(models) {
        Menu.hasMany(models.Section);
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
  return Menu;
};