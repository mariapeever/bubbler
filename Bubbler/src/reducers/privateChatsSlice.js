import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import ObjectID from 'bson-objectid'


const initialState = {
	privateChats: {},
	nextObjectID: '',
	status: 'idle',
	error: null
}

const status = ['active','pending','hidden','archived']

export const fetchPrivateChatsFromList = createAsyncThunk('privateChats', async privCList => {

	var ids = privCList.toString()

	var url = `http://localhost:8000/api/private-chats/find?ids=${ids}`

	return await fetch(url)
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(error =>{
					console.error(error)
				})
})

export const fetchPrivateChat = createAsyncThunk('privateChats', async id => {
	var url = `http://localhost:8000/api/private-chats/${id}`
	return await fetch(url)
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(error =>{
					console.error(error)
				}) 
})

export const createPrivateChat = createAsyncThunk('privateChats', async privateChat => {
	
	return await fetch('http://localhost:8000/api/private-chats/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(privateChat)
    })
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(err =>{
					console.error(err)
				}) 
})

export const updatePrivateChat = createAsyncThunk('privateChats', async privateChat => {
	var url = `http://localhost:8000/api/private-chats/update/${privateChat.id}`
	
	return await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(privateChat)
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
		title: e.title,
		description: e.description ? e.description : '',
		participantsList: e.participantsList,
		callsList: e.callsList ? e.callsList : '',
		messagesList: e.messagesList ? e.messagesList : '',
		imagesList: e.imagesList ? e.imagesList : '',
		videosList: e.videosList ? e.videosList : '',
		linksList: e.linksList ? e.linksList : '',
		locationsList: e.locationsList ? e.locationsList : '',
		documentsList: e.documentsList ? e.documentsList : '',
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	}
}

const preparePrivateChatsFromListPayload = (payload) => {
	
	var privateChats = {}
	
	for (let [key, val] of Object.entries(payload)) {
		privateChats[val._id] = constructor(val)
	}
	return { payload: privateChats }
}

const preparePrivateChatPayload = (payload) => {

	var privateChat = Object.assign({}, constructor(payload))
	// // console.log('privateChat payload', { payload: 
		// { [payload._id] : privateChat }})
	return { payload: 
		{ [payload._id] : privateChat }}
}

var currentState = initialState

export const privateChatsSlice = createSlice({
	name: 'privateChats',
	initialState,
	reducers: {
		privateChatsFetchedFromList: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privateChats: action.payload }
		    },
		    prepare(payload) {
		    	return preparePrivateChatsFromListPayload(payload)
		    }
		},
		privateChatFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privateChats: { ...currentState.privateChats, ...action.payload } }
		    },
		    prepare(payload) {
		    	return preparePrivateChatPayload(payload)
		    }
		},
		privateChatAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, privateChats: { ...currentState.privateChats, ...action.payload } }
		    },
		    prepare(payload) {
		    	return preparePrivateChatPayload(payload)
		    }
		},
		privateChatUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, privateChats: { ...currentState.privateChats, ...action.payload } }
			},
			prepare(payload) {
				return preparePrivateChatPayload(payload)
			}
		}
	},

	extraReducers:  {}
})

export default privateChatsSlice.reducer

export const { 
	privateChatsFetchedFromList, 
	privateChatFetched, 
	privateChatAdded, 
	privateChatUpdated } = privateChatsSlice.actions

export const selectPrivateChatById = id => {
	
	return currentState.privateChats[id] ? { ...currentState.privateChats[id], id: id } : false
}

export const selectPrivateChats = () => {
	return Object.entries(currentState.privateChats).map(([key, value]) => {
		return { ...value, id: key }
	})
}
export const selectPrivateChatsFromList = privCList => privCList.map(e => { 
	return { ...currentState.privateChats[e], id: e } 
})

export const selectPrivateChatById_UpdatedAt = id => currentState.privateChats[id] ? currentState.privateChats[id].updatedAt : ''

export const genObjectID = () => {
	currentState = { ...currentState, nextObjectID: ObjectID()} 
}

export const selectNextObjectID = () => {
	return currentState.nextObjectID
}





