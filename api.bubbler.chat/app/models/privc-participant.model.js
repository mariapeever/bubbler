module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCParticipantSchema = new Schema(
		{	
			
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			role: { type: Schema.Types.ObjectId, ref: 'Role' },
			addedBy: { type: Schema.Types.ObjectId, ref: 'Participant' },
			flaggedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
			blockedBy: { type: Schema.Types.ObjectId, ref: 'User' },
			removedBy: { type: Schema.Types.ObjectId, ref: 'User' },
			status: String, // active, inactive, deleted, blocked
			lastActiveAt: Date,
  			flaggedAt: [Date],
  			deactivatedAt: Date,
  			blockedAt: Date
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt'
	  		} 
	  	}
	);
	
	var PrivCParticipant = mongoose.model(
		'PrivCParticipant', 
		privCParticipantSchema 
	);

	return PrivCParticipant;
}

