module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var contactSchema = new Schema(
		{	
			title: String,
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			status: '', // 'ok', 'inactive', 'blocked'
			availability: 'available', 'away', 'busy'
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			blockedAt: Date,
	  			deletedAt: Date,
	  		} 
	  	}
	);
	
	var Contact = mongoose.model('Contact', contactSchema );

	return Contact;
}
