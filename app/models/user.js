// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs'); //library used to hash password

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
  	userid: {
  		type: DataTypes.INTEGER,
  		primaryKey: true,
  		autoIncrement: true
  	},
  	email: {
  		type: DataTypes.STRING(320),
  		allowNull: false
  	},
  	password: {
  		type: DataTypes.CHAR(60),
  		allowNull: false
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

// var UserSchema = new Schema({
	
// 	name: String,
// 	username: { type: String, required: true, unique: true },
// 	password: { type: String, required: true, select: false} //we dont want to query password as well

// });

// UserSchema.pre('save', function(next) {

// 	var user = this;

// 	if(!user.isModified('password')) return next();

// 	bcrypt.hash(user.password, null, null, function(err, hash) {
// 		console.log(user)
// 		if(err) return next(err);

// 		user.password = hash;
// 		next();

// 	});
// });

// UserSchema.methods.comparePassword = function(password) { //create custome method called compare password

// 	var user = this;

// 	return bcrypt.compareSync(password, user.password);
// }

// module.exports = mongoose.model('User', UserSchema);