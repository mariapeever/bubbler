module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var liveCListSchema = new Schema(
		{	
			active: { type: Schema.Types.ObjectId, ref: 'LiveChat' },
			hidden: { type: Schema.Types.ObjectId, ref: 'LiveChat' },
			archived: { type: Schema.Types.ObjectId, ref: 'LiveChat' },
			deleted: { type: Schema.Types.ObjectId, ref: 'LiveChat' },
		},
	  	{ 
	  		timestamps: 
	  		{  
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt'
	  		} 
	  	}
	);
	
	var LiveCList = mongoose.model('LiveCList', liveCListSchema );

	return LiveCList;
}

