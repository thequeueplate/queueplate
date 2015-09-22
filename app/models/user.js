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