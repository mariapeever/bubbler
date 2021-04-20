module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var callsListSchema = new Schema(
		{	
			recent: [{ type: Schema.Types.ObjectId, ref: 'Call' }],
			missed: [{ type: Schema.Types.ObjectId, ref: 'Call' }],
			archived: [{ type: Schema.Types.ObjectId, ref: 'Call' }],
			deleted: [{ type: Schema.Types.ObjectId, ref: 'Call' }]
		},
	  	{ 
	  		timestamps: 
	  		{  
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt'
	  		} 
	  	}
	);
	
	var CallsList = mongoose.model('Calls', callsListSchema );

	return CallsList;
}

