module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var contactsListSchema = new Schema(
		{	
			ok: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
			requestReceived: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
			requestSent: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
			blocked: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			deletedAt: Date,
	  			archivedAt: Date
	  		} 
	  	}
	);
	
	var ContactsList = mongoose.model('ContactsList', contactsListSchema );

	return ContactsList;
}
