module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCParticMsgListSchema = new Schema(
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
	
	var PrivCParticMsgList = mongoose.model(
		'PrivCParticMsgList', 
		privCParticMsgListSchema 
	);

	return PrivCParticMsgList;
}

