module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var replySchema = new Schema(
		{	
			message: { type: Schema.Types.ObjectId, ref: 'Message' },
			type: String,
	    	content: String,
	    	status: String,
	    	reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
	    	shares: [{ type: Schema.Types.ObjectId, ref: 'Share' }],
	    	replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
	    	replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
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
	  			updatedAt: 'updatedAt',
	  			sent: Date,
	  			received: Date,
	  			seen: Date
	  		} 
	  	}
	);
	
	var Reply = mongoose.model('Reply', replySchema );

	return Reply;
}

