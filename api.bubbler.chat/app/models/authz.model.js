module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var authZSchema = new Schema(
		{	
			activeRole: String
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at'
	  		} 
	  	}
	);
	
	var AuthZ = mongoose.model('AuthZ', authZSchema );

	return AuthZ;
}

