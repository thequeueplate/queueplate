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
    },
    website: {
      type: DataTypes.STRING(2083)
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
        bcrypt.hash(rest.passwordRest, null, null, function(err, hash) {
          rest.passwordRest = hash;
          return cb(null, options);
        })
      }
    },
    instanceMethods: {
      comparePasswordRest: function(passwordRest) {
        console.log("compare hit");
        return bcrypt.compareSync(passwordRest, this.passwordRest)
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        Restaurant.hasMany(models.MenuItem)
      }
    }
  });

  return Restaurant;
};