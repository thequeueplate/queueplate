var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs'); //library used to hash password

var UserSchema = new Schema({
	
	name: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, select: false} //we dont want to query password as well

});

UserSchema.pre('save', function(next) {

	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash) {
		console.log(user)
		if(err) return next(err);

		user.password = hash;
		next();

	});
});

UserSchema.methods.comparePassword = function(password) { //create custome method called compare password

	var user = this;

	return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);