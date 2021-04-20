module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var authSchema = new Schema(
		{	
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			ip: String,
			username: String,
	    	password: String,
	    	passwordStrength: Number, // calc password strength
	    	attempts: Number // login attempts
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt',
	  			lockedOut: Date,
	  			deactivated: Date,
	  		} 
	  	}
	);
	
	var Auth = mongoose.model('Auth', authSchema );

	return Auth;
}

