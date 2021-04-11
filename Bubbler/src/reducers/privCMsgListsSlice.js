import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { selectPrivateChatById } from './privateChatsSlice'

const initialState = {
	privCMsgLists: {},
	status: 'idle',
	error: null
}

export const fetchPrivCMsgList = createAsyncThunk('privCMsgLists', async id => {
	// accepts privCList ref from User
	var url = `http://localhost:8000/api/privc-msg-lists/${id}`
	return await fetch(url)
	    .then((response) => response.json())
			.then((data) => {
				return data
			})
				.catch((error) =>{
					console.error(error)
				}) 
})

const constructor = e => {
	return {
		id: e._id,
		ok: [ ...e.ok ],
		flagged: [ ...e.flagged ],
		removed: [ ...e.removed ],
		createdAt: e.createdAt,
		updatedAt: e.updated_at
	}
}

const preparePayload = payload => {
	
	var privCMsgList = {}
	privCMsgList[payload._id] = constructor(payload)
	return { payload: privCMsgList }
}

var currentState = initialState

export const privCMsgListsSlice = createSlice({
	name: 'privCMsgLists',
	initialState,
	reducers: {
		privCMsgListFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCMsgLists: { ...currentState.privCMsgLists, ...action.payload }}
		    },
		    prepare(action) {
		    	return preparePayload(action.payload)
		    }
		}
	},

	extraReducers:  {}
})

export default privCMsgListsSlice.reducer

export const { privCMsgListFetched } = privCMsgListsSlice.actions

export const selectPrivCMsgLists = () => currentState.privCMsgLists

// export const selectPrivCMsgListByChatId = chatId => selectPrivateChatById(chatId).messagesList

export const selectPrivCMsgListById = id => currentState.privCMsgLists[id]

export const selectOKPrivCMsgList = id => currentState.privCMsgLists[id].ok
export const selectFlaggedPrivCMsgList = id => currentState.privCMsgLists[id].flagged
export const selectRemovedPrivCMsgList = id => currentState.privCMsgLists[id].removed



