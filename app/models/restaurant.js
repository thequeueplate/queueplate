var bcrypt = require('bcrypt-nodejs'); //library used to hash password

module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    restid: {
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
    firstName: {
      type: DataTypes.STRING()
    },
    lastName: {
      type:DataTypes.STRING()
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['Male', 'Female', 'N/A']
    },
    phoneNumber: {
      type: DataTypes.STRING()
    },
    buisnessEmail: {
      type: DataTypes.STRING(320),
      allowNull: false
    },
    stripeAccount: {
      type: DataTypes.INTEGER()
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