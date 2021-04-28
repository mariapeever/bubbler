
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
	contactsList: {},
	status: 'idle',
	error: null
}

const status = ['active', 'pending', 'hidden', 'archived']

export const fetchContactsList = createAsyncThunk('contactsList', async id => {
	// accepts contactsList ref from User
	var url = `http://localhost:8000/api/contacts-lists/${id}`

	return await fetch(url)
	    .then((response) => response.json())
			.then((data) => {
				return data
			})
				.catch((error) =>{
					console.error(error)
				}) 
})

const preparePayload = (payload) => {
	var contactsList = {
		ok: {},
		requestReceived: {},
		requestSent: {},
		blocked: {},
		createdAt: payload.createdAt,
		updatedAt: payload.updatedAt
	}

	for (let [key, val] of Object.entries(contactsList)) {
		if(status.includes(key)) {
			payload[key].forEach(e => {
				contactsList[key] = { ...contactsList[key], ...e}
			})
		}
	}

	return { payload: 
		{ [payload._id] : contactsList }}
}

var currentState = initialState

export const contactsListSlice = createSlice({
	name: 'contactsList',
	initialState,
	reducers: {
		contactsListFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, contactsList: { ...currentState.contactsList, ...action.payload }}
		    },
		    prepare(payload) {
		    	return preparePayload(payload)
		    }
		}
	},

	extraReducers:  {}
})

export default contactsListSlice.reducer

export const { contactsListFetched } = contactsListSlice.actions

export const selectContactsList = id => {
	Object.entries(currentState.contactsList[id]).forEach(([key, value]) => {
		if (status.includes(key)) {
			currentState.contactsList[id][key] = Object.keys(currentState.contactsList[id][key])
		}
	})
	return currentState.contactsList[id]
}

export const selectContactsListParticipantByContactsId = contactsId => {

	let entries = Object.entries(currentState.contactsList[selectContactsListId()])
	for(let i = 0; i < entries.length; i++) {
		let [key, value] = entries[i]
		return (status.includes(key) && Object.keys(value).includes(contactsId)) ? 
			value[contactsId].participant : '' 
	}
}

export const selectContactsListId = () => {
	return Object.keys(currentState.contactsList)[0]
}

export const selectContactsList_Active = (participant = false) => {
	if (currentState.contactsList[selectContactsListId()]) {
		return participant ? currentState.contactsList[selectContactsListId()].active : 
			Object.keys(currentState.contactsList[selectContactsListId()].active)
	} 
	return participant ? {} : []
}

export const selectContactsList_Pending = (participant = false) => {
	if (currentState.contactsList[selectContactsListId]) {
		return participant ? currentState.contactsList[selectContactsListId()].pending : 
			Object.keys(currentState.contactsList[selectContactsListId()].pending)
	} 
	return participant ? {} : []
	
}
export const selectContactsList_Hidden = (participant = false) => {
	if (currentState.contactsList[selectContactsListId]) {
		return participant ? currentState.contactsList[selectContactsListId()].hidden : 
			Object.keys(currentState.contactsList[selectContactsListId()].hidden)
	}
	return participant ? {} : []
}
export const selectContactsList_Archived = (participant = false) => {
	if (currentState.contactsList[selectContactsListId]) {
		return participant ? currentState.contactsList[selectContactsListId()].archived : 
			Object.keys(currentState.contactsList[selectContactsListId()].archived)
	} 
	return participant ? {} : []
}




