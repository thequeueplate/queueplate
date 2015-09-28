module.exports = function(sequelize, DataTypes) {
  var FavoriteOrder = sequelize.define("FavoriteOrder", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        FavoriteOrder.belongsTo(models.User);
        FavoriteOrder.hasOne(models.Order);
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
  return FavoriteOrder;
};