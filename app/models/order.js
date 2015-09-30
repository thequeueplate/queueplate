module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Placed', 'Received', 'Started', 'Completed', 'Delivery', 'Delivered']
    }
  }, {
    classMethods: {
      associate: function(models) {
        Order.hasMany(models.OrderItem);
        Order.belongsTo(models.FavoriteOrder);
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
  return Order;
};