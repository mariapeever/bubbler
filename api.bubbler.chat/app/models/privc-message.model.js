module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCMessageSchema = new Schema(
		{	
			participant: { type: Schema.Types.ObjectId, ref: 'PrivCParticipant' },
			type: String,
	    	content: String,
	    	status: String,
	    	reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
	    	shares: [{ type: Schema.Types.ObjectId, ref: 'Share' }],
	    	attachments: 
	    		{
	    			video: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
	    			image: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
	    			voice: [{ type: Schema.Types.ObjectId, ref: 'Voice' }],
	    			document: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
	    			location: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
	    			link: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
	    			contact: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
	    		}
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt'
	  		} 
	  	}
	);
	var PrivCMessage = mongoose.model('PrivCMessage', privCMessageSchema );

	return PrivCMessage;
}

