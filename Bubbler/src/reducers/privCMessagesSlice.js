import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { selectPrivCMsgListById } from './privCMsgListsSlice'

const initialState = {
	privCMessages: {},
	status: 'idle',
	error: null
}
const status = ['ok','flagged','removed']

export const fetchPrivCMessagesFromList = createAsyncThunk('PrivCMessages', async privCMsgList => {

	const ids = privCMsgList.toString()
	const url = `http://localhost:8000/api/privc-messages/find?ids=${ids}`

	return privCMessages = await fetch(url)
	    .then(response => response.json())
			.then(data => {
				return data

			})
				.catch(error =>{
					console.error(error)
				})
	
})

export const fetchPrivCMessage = createAsyncThunk('privCMessages', async id => {
	
	const url = `http://localhost:8000/api/privc-messages/${id}`
	return await fetch(url)
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(error =>{
					console.error(error)
				}) 
})

export const createPrivCMessage = createAsyncThunk('privCMessages', async message => {
	// Create WebSocket connection.

	const url = `http://localhost:8000/api/privc-messages/`

	return await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(err =>{
					console.error(err)
				}) 
})

export const updatePrivCMessage = createAsyncThunk('privCMessages', async message => {

	const url = `http://localhost:8000/api/privc-messages/update/${msg.id}`
	
	return await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
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
		participant: e.participant,
		type: e.type,
		content: e.content,
		status: e.status,
		reactions: e.reactions ? e.reactions : {},
		shares: e.shares ? e.shares : {},
		attachments: {
			video: e.video ? e.video : {},
			image: e.image ? e.image : {},
			voice: e.voice ? e.voice : {},
			document: e.document ? e.document : {},
			location: e.location ? e.location : {},
			link: e.link ? e.link : {},
			contact: e.contact ? e.contact : {}
		},
		sent: e.sent ? e.sent : '',
		received: e.received ? e.received : '',
		seen: e.seen ? e.seen : '',
		createdAt: e.createdAt,
		updatedAt: e.updatedAt,
	}
}

const preparePrivCMessagesFromListPayload = (payload) => {
	var privCMessages = {}
	payload.forEach(e => {
		privCMessages[e._id] = constructor(e)
	})
	return { payload: privCMessages }
}

const preparePrivCMessagePayload = (payload) => {
	
	var privCMessage = Object.assign({}, constructor(payload))
	
	return { payload: privCMessage }
}

var currentState = initialState

export const privCMessagesSlice = createSlice({
	name: 'privCMessages',
	initialState,
	reducers: {

		privCMessagesFetchedFromList: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCMessages: { ...currentState.privCMessages, ...action.payload }}
		    },
		    prepare(payload) {
		    	return preparePrivCMessagesFromListPayload(payload)
		    }
		},

		privCMessageFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCMessages: { ...currentState.privCMessages, ...action.payload } }
		    },
		    prepare(payload) {
		    	return preparePrivCMessagePayload(payload)
		    }
		},
		privCMessageAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, privCMessages: { ...currentState.privCMessages, ...action.payload } }
		    },
		    prepare(payload) {
		    	return preparePrivCMessagePayload(payload)
		    }
		},
		privCMessageUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, privCMessages: { ...currentState.privCMessages, ...action.payload } }
			},
			prepare(payload) {
				return preparePrivCMessagePayload(payload)
			}
		}
	},

	extraReducers:  {}
})

export default privCMessagesSlice.reducer

export const { privCMessagesFetchedFromList, privCMessageFetched, privCMessageAdded, privCMessageUpdated } = privCMessagesSlice.actions

export const selectPrivCMessages = () => {
	return Object.entries(currentState.privCMessages).map(([key, value]) => {
		return { ...value, id: key }
	})
}

const snglMsgConstructor = id => {
	return currentState.privCMessages[id] ? { ...currentState.privCMessages[id], id: id } : false
}

export const selectPrivCMessagesFromList = privCMsgList => {
	return privCMsgList.map(id => snglMsgConstructor(id))
}

export const selectPrivCMessageById = id => {
	return snglMsgConstructor(id)
}
export const selectLastMessageFromList = privCMsgList => {
	let id = privCMsgList.length ? privCMsgList[privCMsgList.length - 1] : false
	return id ? snglMsgConstructor(id) : false
}








