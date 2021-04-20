module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCParticListSchema = new Schema(
		{	
			admin: [{ type: Schema.Types.ObjectId, ref: 'PrivCParticipant' }],
			active: [{ type: Schema.Types.ObjectId, ref: 'PrivCParticipant' }],
			pending: [{ type: Schema.Types.ObjectId, ref: 'PrivCParticipant' }],
			inactive: [{ type: Schema.Types.ObjectId, ref: 'PrivCParticipant' }],
			flagged: [{ type: Schema.Types.ObjectId, ref: 'PrivCParticipant' }],
			blocked: [{ type: Schema.Types.ObjectId, ref: 'PrivCParticipant' }],
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
	
	var PrivCParticList = mongoose.model(
		'PrivCParticList', 
		privCParticListSchema 
	);

	return PrivCParticList;
}
