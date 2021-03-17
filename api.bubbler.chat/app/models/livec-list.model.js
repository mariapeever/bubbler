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
	  			updatedAt: 'updated_at'
	  		} 
	  	}
	);
	
	var LiveCList = mongoose.model('LiveCList', liveCListSchema );

	return LiveCList;
}

