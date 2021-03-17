module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var liveChatSchema = new Schema(
		{	
			title: String,
			description: String,
			participants: { type: Schema.Types.ObjectId, ref: 'PrivateChatParticipants' },
			mediaGallery: { type: Schema.Types.ObjectId, ref: 'PrivateChatMediaGallery' },
			links: { type: Schema.Types.ObjectId, ref: 'PrivateChatLinksList' },
			documents: { type: Schema.Types.ObjectId, ref: 'PrivateChatDocumentsList' },
			calls: { type: Schema.Types.ObjectId, ref: 'PrivateChatCallsList' },
			messages: { type: Schema.Types.ObjectId, ref: 'PrivateChatMessagesList' },
			shares: Number,
			roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }] // ?
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			archivedAt: Date,
	  			deletedAt: Date
	  		} 
	  	}
	);
	
	var LiveChat = mongoose.model('LiveChat', liveChatSchema );

	return LiveChat;
}

