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
		system: [ ...e.system ],
		admin: [ ...e.admin ],
		active: [ ...e.active ],
		pending: [ ...e.pending ],
		inactive: [ ...e.inactive ],
		flagged: [ ...e.flagged ],
		blocked: [ ...e.blocked ],
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
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
		    prepare(payload) {
		    	return preparePayload(payload)
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

export const selectPrivCParticList_System = id =>  currentState.privCParticLists[id] ? currentState.privCParticLists[id].system : []
export const selectPrivCParticList_Admin = id => currentState.privCParticLists[id] ? currentState.privCParticLists[id].admin : []
export const selectPrivCParticList_Active = id => currentState.privCParticLists[id] ? currentState.privCParticLists[id].active : []
export const selectPrivCParticList_Pending = id => currentState.privCParticLists[id] ? currentState.privCParticLists[id].pending : []
export const selectPrivCParticList_Inactive = id => currentState.privCParticLists[id] ? currentState.privCParticLists[id].inactive : []
export const selectPrivCParticList_Flagged = id => currentState.privCParticLists[id] ? currentState.privCParticLists[id].flagged : []
export const selectPrivCParticList_Blocked = id => currentState.privCParticLists[id] ? currentState.privCParticLists[id].blocked : []


