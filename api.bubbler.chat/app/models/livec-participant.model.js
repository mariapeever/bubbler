module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var liveCParticipantSchema = new Schema(
		{	
			
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			role: { type: Schema.Types.ObjectId, ref: 'Role' },
			status: String, // active, inactive, deleted, blocked ?
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			lastActive: Date,
	  			deactivated: Date,
	  			blocked: Date
	  		} 
	  	}
	);
	
	var LiveCParticipant = mongoose.model('LiveCParticipant', liveCParticipantSchema );

	return LiveCParticipant;
}

