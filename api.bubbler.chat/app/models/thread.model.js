module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var threadSchema = new Schema(
		{	
			head: { type: Schema.Types.ObjectId, ref: 'Message' },
			replies: [{
				message: { type: Schema.Types.ObjectId, ref: 'Message' },
				replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
			}],
	    	
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  		} 
	  	}
	);
	
	var Thread = mongoose.model('Thread', threadSchema );

	return Thread;
}

