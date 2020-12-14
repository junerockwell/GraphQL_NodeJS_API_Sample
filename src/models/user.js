import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import timestamp from 'mongoose-timestamp';

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
        required: true,
        trim: true,
	},
	lastname: {
		type: String,
        required: true,
        trim: true,
	},
	email: {
		type: String,
        required: true,
        trim: true,
	},
	password: {
		type: String,
		required: true
	},
});

/* Plugins
 ============================================= */
UserSchema.plugin(timestamp);

/* Methods
 ============================================= */
UserSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = (givenPassword, userPassword) => {
	return bcrypt.compareSync(givenPassword, userPassword);
};

export default mongoose.model('User', UserSchema);