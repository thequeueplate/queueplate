module.exports = function(sequelize, DataTypes) {
  var Section = sequelize.define("Section", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT()
    }
  }, {
    classMethods: {
      associate: function(models) {
        Section.hasMany(models.MenuItem);
        Section.belongsTo(models.Restaurant);
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
  return Section;
};