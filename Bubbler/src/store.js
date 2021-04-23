import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

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
	},
	middleware: [...getDefaultMiddleware({immutableCheck: false})]
});

export default store