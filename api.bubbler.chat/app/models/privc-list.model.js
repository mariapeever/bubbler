module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var privCListSchema = new Schema(
		{	
			active: [{ 
				privateChat: { type: Schema.Types.ObjectId, ref: 'PrivateChat'},
				participant: { type: Schema.Types.ObjectId, ref: 'PrivCParticipant'},
			}],
			pending: [{ 
				privateChat: { type: Schema.Types.ObjectId, ref: 'PrivateChat'},
				participant: { type: Schema.Types.ObjectId, ref: 'PrivCParticipant'},
			}],
			hidden: [{ 
				privateChat: { type: Schema.Types.ObjectId, ref: 'PrivateChat'},
				participant: { type: Schema.Types.ObjectId, ref: 'PrivCParticipant'},
			}],
			archived: [{ 
				privateChat: { type: Schema.Types.ObjectId, ref: 'PrivateChat'},
				participant: { type: Schema.Types.ObjectId, ref: 'PrivCParticipant'},
			}],
			deleted: [{ 
				privateChat: { type: Schema.Types.ObjectId, ref: 'PrivateChat'},
				participant: { type: Schema.Types.ObjectId, ref: 'PrivCParticipant'},
			}],
		},
	  	{ 
	  		timestamps: 
	  		{  
	  			createdAt: 'createdAt', 
	  			updatedAt: 'updatedAt'
	  		} 
	  	}
	);
	
	var PrivCList = mongoose.model('PrivCList', privCListSchema );

	return PrivCList;
}

