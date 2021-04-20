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
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt',
	  		} 
	  	}
	);
	
	var PrivCParticMsgList = mongoose.model(
		'PrivCParticMsgList', 
		privCParticMsgListSchema 
	);

	return PrivCParticMsgList;
}

