module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCParticMessagesListSchema = new Schema(
		{	
			pending: [{ type: Schema.Types.ObjectId, ref: 'PrivCMessage' }],
			removed: [{ type: Schema.Types.ObjectId, ref: 'PrivCMessage' }],
		},
	  	{ 
	  		timestamps: 
	  		{  
	  			updatedAt: 'updated_at'
	  		} 
	  	}
	);
	
	var PrivCParticMessagesList = mongoose.model(
		'PrivCParticMessagesList', 
		privCParticMessagesListSchema 
	);

	return PrivCParticMessagesList;
}

