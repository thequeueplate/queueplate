var bcrypt = require('bcrypt-nodejs'); //library used to hash password

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
  	userid: {
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
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'owner', 'customer']
    }
  }, {
  	hooks: {
  		beforeCreate: function(user, options, cb) {
  			bcrypt.hash(user.password, null, null, function(err, hash) {
  				user.password = hash;
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
  //       User.hasMany(models.Favorite)	USE LATER
  //     }
  //   }
  });

  return User;
};