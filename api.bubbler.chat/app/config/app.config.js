
exports.SECRET = 'lNU/3yB4D9U99YPBCWMTPQAROPehGZBRhJKShmnfEBLdSRU1pPRyfq54I/nCJW2Q58h/2oYbZeVblMoB8pFUcgjkJjIGI356zlF';

exports.PRIVACY = { 
	USER: 
	{
		FIRST_NAME: 'public', 
		LAST_NAME: 'public',
		EMAIL: 'private',
		MOBILE: 'private',
		DOB: 'private',
		IMAGE: 'public',
		STATUS: 'contacts',
	}
}

exports.MEDIA = {
	STATUS: 
	[
		'published', 
		'hidden', 
		'archived', 
		'deleted'
	]
};

exports.PRIVATE_CHAT = {
	STATUS: 
	[
		'active', 
		'hidden', 
		'archived', 
		'deleted'
	],
	PP_STATUS:
	[
		'admin',
		'active',
		'pending',
		'inactive',
		'flagged',
		'blocked'
	],
	ROLES:
	{
		ADMIN: 
		[
			'add-participants',
			'block-participants',
			'flag-participants',
			'delete-participants',
			'send-receive-messages',
			'react',
			'share',
			'delete-media',
			'update-chat-settings',
			'delete-chat'
		],
		ACTIVE:
		[
			'flag-participants',
			'send-receive-messages',
			'add-media',
			'react',
			'share'
		],
		PENDING:
		[
			'join-chat'
		],
		INACTIVE: [],
		FLAGGED: 
		[
			'flag-participants',
			'send-receive-messages',
			'add-media',
			'react',
			'share'
		],
		BLOCKED: []

	}
};

exports.FIELDS = {
	USER: 
	[
		'firstName',
		'lastName',
		'email',
		'dob',
		'mobile',
		'status'	
	]
};


