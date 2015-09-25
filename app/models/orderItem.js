module.exports = function(sequelize, DataTypes) {
  var OrderItem = sequelize.define("OrderItem", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER(3)
    },
    comments: {
      type: DataTypes.STRING(200)
    }
  }, {
    classMethods: {
      associate: function(models) {
        OrderItem.belongsTo(models.Order);
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
  return OrderItem;
};