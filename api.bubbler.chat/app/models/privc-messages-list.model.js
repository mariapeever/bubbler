module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCMessagesListSchema = new Schema(
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
	
	var PrivCMessagesList = mongoose.model(
		'PrivCMessagesList', 
		privCMessagesListSchema 
	);

	return PrivCMessagesList;
}

