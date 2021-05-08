import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { selectUserId, selectUserById } from './usersSlice'
import { selectPrivCParticListById } from './privCParticListsSlice'

const initialState = {
	privCParticipants: {},
	status: 'idle',
	error: null
}

const status = ['admin','system','active','pending','inactive','flagged','blocked']

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
		user: e.user,
		addedBy: e.addedBy ? e.addedBy : '',
		flaggedBy: e.flaggedBy ? [...e.flaggedBy] : [],
		blockedBy: e.blockedBy ? e.blockedBy : '',
		removedBy: e.removedBy ? e.removedBy : '',
		status: e.status,
		messagesList: e.messagesList ? e.messagesList : '',
		lastActiveAt: e.lastActiveAt ? e.lastActiveAt : '',
		flaggedAt: e.flaggedAt ? e.flaggedAt : '',
		deactivatedAt: e.deactivatedAt ? e.deactivatedAt : '',
		blockedAt: e.blockedAt ? e.blockedAt : '',
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
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
		    prepare(payload) {
		    	return preparePrivCParticipantsFromListPayload(payload)
		    }
		},
		privCParticipantFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCParticipants: { ...currentState.privCParticipants, ...action.payload } }

		    },
		    prepare(payload) {
		    	return preparePrivCParticipantPayload(payload)
		    }
		},
		privCParticipantAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, privCParticipants: { ...currentState.privateChats, ...action.payload } }
		    },
		    prepare(payload) {
		    	return preparePrivCParticipantPayload(payload)
		    }
		},
		privCParticipantUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, privCParticipants: { ...currentState.privCParticipants, ...action.payload } }
			},
			prepare(payload) {
				return preparePrivCParticipantPayload(payload)
			}
		}
	},

	extraReducers:  {}
})

export default privCParticipantsSlice.reducer

export const { privCParticipantsFetchedFromList, privCParticipantFetched, privCParticipantAdded, privCParticipantUpdated } = privCParticipantsSlice.actions

export const selectPrivCParticipants_Users = () => {
	return Object.values(currentState.privCParticipants)
		.map(e => e.user)
			.filter(e => e != selectUserId())
}

export const selectParticipantsFromList_Users = particList => {
	
	return Object.entries(currentState.privCParticipants)
		.filter(([key, value]) => particList.includes(key))
			.map(([key, value]) => value.user)
				.filter(e => e != selectUserId())
					.map(e => selectUserById(e))
	
}

export const selectPrivCParticipants = () => {
	return Object.entries(currentState.privCParticipants).map(([key, value]) => {
		return { ...value, id: key }
	})
}

export const selectPrivCParticipantsFromList = privCParticList => privCParticList.map(e => {
	return { ...currentState.privCParticipants[e], id: e }
})

export const selectPrivCParticipantById = id => {
	return { ...currentState.privCParticipants[id], id: id }
}




