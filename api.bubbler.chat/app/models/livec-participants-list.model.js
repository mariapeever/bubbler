module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var liveCParticipantsListSchema = new Schema(
		{	
			active: [{ type: Schema.Types.ObjectId, ref: 'LiveCParticipant' }],
			pending: [{ type: Schema.Types.ObjectId, ref: 'LiveCParticipant' }],
			inactive: [{ type: Schema.Types.ObjectId, ref: 'LiveCParticipant' }],
			flagged: [{ type: Schema.Types.ObjectId, ref: 'LiveCParticipant' }],
			blocked: [{ type: Schema.Types.ObjectId, ref: 'LiveCParticipant' }],
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			deletedAt: Date
	  		} 
	  	}
	);
	
	var LiveCParticipantsList = mongoose.model('LiveCParticipantsList', liveCParticipantsListSchema );

	return LiveCParticipantsList;
}


