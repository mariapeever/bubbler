module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var userSchema = new Schema(
		{	
			firstName: String,
			lastName: String,
			dob: Date,
			email: String,
			mobile: String,
			image: String,
			status: String,
			privacy: 
			{
				firstName: String,
				lastName: String,
				email: String,
				mobile: String,
				dob: String,
				image: String,
				status: String,
			},
			wall: { type: Schema.Types.ObjectId, ref: 'Wall' },
			profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
			contacts: { type: Schema.Types.ObjectId, ref: 'ContactsList' },
			privateChats: { type: Schema.Types.ObjectId, ref: 'PrivateChatsList' },
			liveChats: { type: Schema.Types.ObjectId, ref: 'LiveChatsList' },
			calls: { type: Schema.Types.ObjectId, ref: 'CallsList' },
		},
	  	{ 
	  		timestamps: 
	  		{ 
	  			createdAt: 'created_at', 
	  			updatedAt: 'updated_at',
	  			lastActiveAt: Date,
	  			deactivatedAt: Date,
	  			deletedAt: Date,
	  			archivedAt: Date,
	  			blockedAt: Date,
	  		} 
	  	}
	);
	
	var User = mongoose.model('User', userSchema );

	return User;
}

