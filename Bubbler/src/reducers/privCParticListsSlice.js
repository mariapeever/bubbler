import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { selectPrivateChatById } from './privateChatsSlice'

const initialState = {
	privCParticLists: {},
	status: 'idle',
	error: null
}

export const fetchPrivCParticList = createAsyncThunk('privCParticLists', async id => {

	// accepts privCList ref from User
	var url = `http://localhost:8000/api/privc-partic-lists/${id}`
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
		admin: [ ...e.admin ],
		active: [ ...e.active ],
		pending: [ ...e.pending ],
		inactive: [ ...e.inactive ],
		flagged: [ ...e.flagged ],
		blocked: [ ...e.blocked ],
		createdAt: e.created_at,
		updatedAt: e.updated_at
	}
}

const preparePayload = payload => {
	
	var privCParticList = {}
	privCParticList[payload._id] = constructor(payload)
	return { payload: privCParticList }
}

var currentState = initialState

export const privCParticListsSlice = createSlice({
	name: 'privCParticLists',
	initialState,
	reducers: {
		privCParticListFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCParticLists: { ...currentState.privCParticLists, ...action.payload }}
		    },
		    prepare(action) {
		    	
		    	return preparePayload(action.payload)
		    }
		}
	},

	extraReducers:  {}
})

export default privCParticListsSlice.reducer

export const { privCParticListFetched } = privCParticListsSlice.actions

export const selectPrivCParticLists = () => currentState.privCParticLists

// export const selectPrivCParticListByChatId = chatId => selectPrivateChatById(chatId).messagesList

export const selectPrivCParticListById = id => currentState.privCParticLists[id]

export const selectAdminPrivCParticList = id => currentState.privCParticLists[id].admin
export const selectActivePrivCParticList = id => currentState.privCParticLists[id].active
export const selectPendingPrivCParticList = id => currentState.privCParticLists[id].pending
export const selectInactivePrivCParticList = id => currentState.privCParticLists[id].inactive
export const selectFlaggedPrivCParticList = id => currentState.privCParticLists[id].flagged
export const selectBlockedPrivCParticList = id => currentState.privCParticLists[id].blocked


