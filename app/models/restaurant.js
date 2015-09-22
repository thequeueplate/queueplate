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
    addLine1: {
      type: DataTypes.STRING(75)
    },
    addLine2: {
      type: DataTypes.STRING(75)
    },
    addLine3: {
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