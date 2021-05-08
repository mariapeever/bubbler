module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var voiceSchema = new Schema(
		{	
			title: String,
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			info: { type: Schema.Types.ObjectId, ref: 'Info' },
			location: { type: Schema.Types.ObjectId, ref: 'Location' },
			label: { type: Schema.Types.ObjectId, ref: 'Label' },
			edited: Boolean,
			url: String,
			duration: String,
			status: String, // ok, broken
			privacy: { type: Schema.Types.ObjectId, ref: 'Privacy' },
			tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
			taggedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
			reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
			shares: [{ type: Schema.Types.ObjectId, ref: 'Share' }],
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt',
	  			publishedAt: Date,
	  			deletedAt: Date,
	  			archivedAt: Date
	  		} 
	  	}
	);
	
	var Voice = mongoose.model('Voice', voiceSchema );

	return Voice;
}
