import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { selectPrivCParticListById } from './privCParticListsSlice'

const initialState = {
	privCParticipants: [],
	status: 'idle',
	error: null
}
const status = ['admins','active','pending','inactive','flagged','blocked']

export const fetchPrivCParticipantsFromList = createAsyncThunk('PrivCParticipants', async privCParticList => {

	let ids = privCParticList.toString()

	var url = `http://localhost:8000/api/privc-participants/find?ids=${ids}`

	return privCParticipants = await fetch(url)
	    .then(response => response.json())
			.then(data => {

				return data
			})
				.catch(error =>{
					console.error(error)
				})
	
})

export const fetchPrivCParticipant = createAsyncThunk('privCParticipants', async id => {

	var url = `http://localhost:8000/api/privc-participants/${id}`
	return await fetch(url)
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(error =>{
					console.error(error)
				}) 
})

export const createPrivCParticipant = createAsyncThunk('privCParticipants', async msg => {
	return await fetch('http://localhost:8000/api/privc-participants/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
    })
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(err =>{
					console.error(err)
				}) 
})

export const updatePrivCParticipant = createAsyncThunk('privCParticipants', async participant => {

	var url = `http://localhost:8000/api/privc-participants/update/${participant.id}`
	
	return await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(participant)
    })
    .then(response => response.json())
		.then(data => {
			return data
		})
			.catch(err =>{
				console.error(err)
			}) 
})

const constructor = e => {
	return {
		id: e._id,
		user: e.user,
		addedBy: e.addedBy ? e.addedBy : '',
		flaggedBy: e.flaggedBy ? [...e.flaggedBy] : [],
		blockedBy: e.blockedBy ? e.blockedBy : '',
		removedBy: e.removedBy ? e.removedBy : '',
		status: e.status,
		messagesList: e.messagesList ? e.messagesList : '',
		createdAt: e.created_at,
		updatedAt: e.updated_at,
		lastActiveAt: e.lastActiveAt ? e.lastActiveAt : '',
		flaggedAt: e.flaggedAt ? e.flaggedAt : '',
		deactivatedAt: e.deactivatedAt ? e.deactivatedAt : '',
		blockedAt: e.blockedAt ? e.blockedAt : '',
	}
}

const preparePrivCParticipantsFromListPayload = (payload) => {
	var privCParticipants = {}
	payload.forEach(participant => {
		privCParticipants[participant._id] = constructor(participant)
	})
	return { payload: privCParticipants }
}

const preparePrivCParticipantPayload = (payload) => {
	
	var privCParticipant = Object.assign({}, constructor(payload))
	
	return { payload: privCParticipant }
}

var currentState = initialState

export const privCParticipantsSlice = createSlice({
	name: 'privCParticipants',
	initialState,
	reducers: {
		privCParticipantsFetchedFromList: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCParticipants: { ...currentState.privCParticipants, ...action.payload }}
		    },
		    prepare(action) {
		    	return preparePrivCParticipantsFromListPayload(action.payload)
		    }
		},
		privCParticipantFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCParticipants: { ...currentState.privCParticipants, ...action.payload } }

		    },
		    prepare(action) {
		    	return preparePrivCParticipantPayload(action.payload)
		    }
		},
		privCParticipantAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, privCParticipants: { ...currentState.privateChats, ...action.payload } }
		    },
		    prepare(action) {
		    	return preparePrivCParticipantPayload(action.payload)
		    }
		},
		privCParticipantUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, privCParticipants: { ...currentState.privCParticipants, ...action.payload } }
			},
			prepare(action) {
				return preparePrivCParticipantPayload(action.payload)
			}
		}
	},

	extraReducers:  {}
})

export default privCParticipantsSlice.reducer

export const { privCParticipantsFetchedFromList, privCParticipantFetched, privCParticipantAdded, privCParticipantUpdated } = privCParticipantsSlice.actions

export const selectPrivCParticipants = () => Object.values(currentState.privCParticipants)

export const selectPrivCParticipantsFromList = privCParticList => privCParticList.map(id => currentState.privCParticipants[id])
export const selectPrivCParticipantById = id => currentState.privCParticipants[id]

export const selectLastParticipantFromList = privCParticList => currentState.privCParticipants[privCParticList[privCParticList.length - 1]]

