module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var authSchema = new Schema(
		{	
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			username: String,
	    	password: String,
	    	passwordStrength: Number, // calc password strength
	    	attempts: Number // login attempts
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			lockedOut: Date,
	  			deactivated: Date,
	  		} 
	  	}
	);
	
	var Auth = mongoose.model('Auth', authSchema );

	return Auth;
}

