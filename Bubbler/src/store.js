import { configureStore } from '@reduxjs/toolkit'

import { 
	userReducer,
	privCListReducer,
	privateChatsReducer,
	privCMsgListsReducer,
	privCMessagesReducer,
	privCParticListsReducer,
	privCParticipantsReducer
} from './reducers'

const store = configureStore({
	reducer: {
		user: userReducer,
		privCList: privCListReducer,
		privateChats: privateChatsReducer,
		privCMsgLists: privCMsgListsReducer,
		privCMessages: privCMessagesReducer,
		privCParticLists: privCParticListsReducer,
		privCParticipants: privCParticipantsReducer,
	}
});

export default store