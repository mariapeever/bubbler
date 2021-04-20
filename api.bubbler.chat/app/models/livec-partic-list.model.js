module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var liveCParticListSchema = new Schema(
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
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt',
	  			deletedAt: Date
	  		} 
	  	}
	);
	
	var LiveCParticList = mongoose.model('LiveCParticList', liveCParticListSchema );

	return LiveCParticList;
}


