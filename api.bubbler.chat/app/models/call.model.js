module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var callSchema = new Schema(
		{	
			caller: { type: Schema.Types.ObjectId, ref: 'User' },
			ip: String,
			location: { type: Schema.Types.ObjectId, ref: 'Location' },
			type: String, // voice-only, video
			status: String, // active, on-hold, missed, recent, archived, deleted
			recording: { type: Schema.Types.ObjectId, ref: 'Recording' },
			transcription: String,
			duration: Number
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			ended: Date,
	  			deleted: Date
	  		} 
	  	}
	);
	
	var Call = mongoose.model('Call', callSchema );

	return Call;
}

