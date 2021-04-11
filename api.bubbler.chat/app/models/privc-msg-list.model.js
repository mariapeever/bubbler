module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCMsgListSchema = new Schema(
		{	
			ok: [{ type: Schema.Types.ObjectId, ref: 'PrivCMessage' }],
			flagged: [{ type: Schema.Types.ObjectId, ref: 'PrivCMessage' }],
			removed: [{ type: Schema.Types.ObjectId, ref: 'PrivCMessage' }],
		},
	  	{ 
	  		timestamps: 
	  		{  
	  			updatedAt: 'updated_at'
	  		} 
	  	}
	);
	
	var PrivCMsgList = mongoose.model(
		'PrivCMsgList', 
		privCMsgListSchema 
	);

	return PrivCMsgList;
}

