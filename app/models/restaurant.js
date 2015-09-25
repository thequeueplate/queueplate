var bcrypt = require('bcrypt-nodejs'); //library used to hash password

module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false
    },
    verify: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING(50)
    },
    firstName: {
      type: DataTypes.STRING(30)
    },
    lastName: {
      type: DataTypes.STRING(30)
    },
    contactPhone: {
      type: DataTypes.STRING(10)
    },
    addLine1: {
      type: DataTypes.STRING(75)
    },
    addLine2: {
      type: DataTypes.STRING(75)
    },
    addCity: {
      type: DataTypes.STRING(30)
    },
    addState: {
      type: DataTypes.CHAR(2)
    },
    addZip: {
      type: DataTypes.INTEGER(5)
    },
    phoneNumber: {
      type: DataTypes.STRING(10)
    },
    businessEmail: {
      type: DataTypes.STRING(320)
    },
    stripeAccount: {
      type: DataTypes.INTEGER()
    },
    cuisine: {
      type: DataTypes.STRING(30)
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'restaurant', 'customer']
    }
  }, {
    hooks: {
      beforeCreate: function(rest, options, cb) {
        bcrypt.hash(rest.password, null, null, function(err, hash) {
          rest.password = hash;
          return cb(null, options);
        })
      }
    },
    classMethods: {
      associate: function(models) {
        Restaurant.hasMany(models.Menu);
      }
    },
    instanceMethods: {
      comparePassword: function(password) {
        console.log("compare hit");
        return bcrypt.compareSync(password, this.password)
      }
    }

  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       User.hasMany(models.Favorite)  USE LATER
  //     }
  //   }
  });

  return Restaurant;
};