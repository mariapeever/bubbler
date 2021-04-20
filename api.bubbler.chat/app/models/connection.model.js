module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var connectionSchema = new Schema(
		{	
			status: String, // dialing, established, dropped, failed
			errorLog: { type: Schema.Types.ObjectId, ref: 'ErrorLog' },
	    	connectionTime: Number
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt',
	  			ended: Date
	  		} 
	  	}
	);
	
	var Connection = mongoose.model('Connection', connectionSchema );

	return Connection;
}

