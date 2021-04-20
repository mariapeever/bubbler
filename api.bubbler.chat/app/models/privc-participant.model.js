module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCParticipantSchema = new Schema(
		{	
			
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			role: { type: Schema.Types.ObjectId, ref: 'Role' },
			addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
			flaggedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
			blockedBy: { type: Schema.Types.ObjectId, ref: 'User' },
			removedBy: { type: Schema.Types.ObjectId, ref: 'User' },
			status: String, // active, inactive, deleted, blocked
			messagesList: { type: Schema.Types.ObjectId, ref: 'PrivCParticMsgList' }
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt',
	  			lastActive: Date,
	  			flagged: [Date],
	  			deactivated: Date,
	  			blocked: Date
	  		} 
	  	}
	);
	
	var PrivCParticipant = mongoose.model(
		'PrivCParticipant', 
		privCParticipantSchema 
	);

	return PrivCParticipant;
}

