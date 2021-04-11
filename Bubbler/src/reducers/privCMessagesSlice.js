import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { selectPrivCMsgListById } from './privCMsgListsSlice'

const initialState = {
	privCMessages: [],
	status: 'idle',
	error: null
}
const status = ['ok','flagged','removed']

export const fetchPrivCMessagesFromList = createAsyncThunk('PrivCMessages', async privCMsgList => {

	let ids = privCMsgList.toString()
	var url = `http://localhost:8000/api/privc-messages/find?ids=${ids}`

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

	var url = `http://localhost:8000/api/privc-messages/${id}`
	return await fetch(url)
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(error =>{
					console.error(error)
				}) 
})

export const createPrivCMessage = createAsyncThunk('privCMessages', async msg => {
	return await fetch('http://localhost:8000/api/privc-messages/', {
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

export const updatePrivCMessage = createAsyncThunk('privCMessages', async msg => {

	var url = `http://localhost:8000/api/privc-messages/update/${msg.id}`
	
	return await fetch(url, {
        method: 'PUT',
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

const constructor = e => {
	return {
		id: e._id,
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
		createdAt: e.created_at,
		updatedAt: e.updated_at,
		sent: e.sent ? e.sent : '',
		received: e.received ? e.received : '',
		seen: e.seen ? e.seen : ''
	}
}

const preparePrivCMessagesFromListPayload = (payload) => {
	var privCMessages = {}
	payload.forEach(msg => {
		privCMessages[msg._id] = constructor(msg)
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
		    prepare(action) {
		    	return preparePrivCMessagesFromListPayload(action.payload)
		    }
		},
		privCMessageFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCMessages: { ...currentState.privCMessages, ...action.payload } }
		    },
		    prepare(action) {
		    	return preparePrivCMessagePayload(action.payload)
		    }
		},
		privCMessageAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, privCMessages: { ...currentState.privateChats, ...action.payload } }
		    },
		    prepare(action) {
		    	return preparePrivCMessagePayload(action.payload)
		    }
		},
		privCMessageUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, privCMessages: { ...currentState.privCMessages, ...action.payload } }
			},
			prepare(action) {
				return preparePrivCMessagePayload(action.payload)
			}
		}
	},

	extraReducers:  {}
})

export default privCMessagesSlice.reducer

export const { privCMessagesFetchedFromList, privCMessageFetched, privCMessageAdded, privCMessageUpdated } = privCMessagesSlice.actions

export const selectPrivCMessages = () => Object.values(currentState.privCMessages)

export const selectPrivCMessagesFromList = privCMsgList => privCMsgList.map(id => currentState.privCMessages[id])

export const selectPrivCMessageById = id => currentState.privCMessages[id]

export const selectLastMessageFromList = privCMsgList => currentState.privCMessages[privCMsgList[privCMsgList.length - 1]]

