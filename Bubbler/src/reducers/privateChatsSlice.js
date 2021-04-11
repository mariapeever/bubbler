import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { selectPrivCLists } from './privCListSlice'

const initialState = {
	privateChats: {},
	status: 'idle',
	error: null
}

const status = ['active','pending','hidden','archived']

export const fetchPrivateChatsFromList = createAsyncThunk('privateChats', async privCList => {

	var ids = Object.keys(privCList).toString()
	var url = `http://localhost:8000/api/private-chats/find?ids=${ids}`
	let privateChats = await fetch(url)
	    .then(response => response.json())
			.then(data => {

				return data
			})
				.catch(error =>{
					console.error(error)
				})
	var chats =  privateChats.map(e => { 
		return {...e, participant: privCList[e._id].participant }
	})
	return chats
	
})

export const fetchPrivateChat = createAsyncThunk('privateChats', async id => {
	var url = `http://localhost:8000/api/privateChats/${id}`
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
	
	return await fetch('http://localhost:8000/api/privateChats/', {
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
	var url = `http://localhost:8000/api/privateChats/update/${privateChat.id}`
	
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
		id: e._id,
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
		participant: e.participant
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
	return { payload: privateChat }
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
		    prepare(action) {
		    	return preparePrivateChatsFromListPayload(action.payload)
		    }
		},
		privateChatFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privateChats: { ...currentState.privateChats, ...action.payload.id } }

		    },
		    prepare(action) {
		    	return preparePrivateChatPayload(action.payload)
		    }
		},
		privateChatAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, privateChats: { ...currentState.privateChats, ...action.payload.id } }
		    },
		    prepare(action) {
		    	return preparePrivateChatPayload(action.payload)
		    }
		},
		privateChatUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, privateChats: { ...currentState.privateChats, ...action.payload.id } }
			},
			prepare(action) {
				return preparePrivateChatPayload(action.payload)
			}
		}
	},

	extraReducers:  {}
})

export default privateChatsSlice.reducer

export const { privateChatsFetchedFromList, privateChatFetched, privateChatAdded, privateChatUpdated } = privateChatsSlice.actions

export const selectPrivateChats = () => Object.values(currentState.privateChats)

export const selectPrivateChatById = id => currentState.privateChats[id]

export const selectPrivateChatsFromList = list => list.map(e => currentState.privateChats[e])




