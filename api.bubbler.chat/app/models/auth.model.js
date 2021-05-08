module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var authSchema = new Schema(
		{	
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			ip: String,
			username: String,
	    	password: String,
	    	passwordStrength: Number, // calc password strength
	    	attempts: Number, // login attempts
	    	lockedOutAt: Date,
	  		deactivatedAt: Date,
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt'
	  		} 
	  	}
	);
	
	var Auth = mongoose.model('Auth', authSchema );

	return Auth;
}

