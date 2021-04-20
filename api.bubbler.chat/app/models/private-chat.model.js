module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privateChatSchema = new Schema(
		{	
			title: String,
			description: String,
			participantsList: { type: Schema.Types.ObjectId, ref: 'PrivCParticList' },
			callsList: { type: Schema.Types.ObjectId, ref: 'PrivCCallsList' },
			messagesList: { type: Schema.Types.ObjectId, ref: 'PrivCMsgList' },
			imagesList: { type: Schema.Types.ObjectId, ref: 'ImagesList' },
			videosList: { type: Schema.Types.ObjectId, ref: 'VideosList' },
			linksList: { type: Schema.Types.ObjectId, ref: 'LinksList' }, 
			locationsList:  { type: Schema.Types.ObjectId, ref: 'LocationsList' }, 
			documentsList: { type: Schema.Types.ObjectId, ref: 'DocumentsList' },
			shares: [{ type: Schema.Types.ObjectId, ref: 'Shares' }],
			roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
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
	
	var PrivateChat = mongoose.model('PrivateChat', privateChatSchema );

	return PrivateChat;
}

