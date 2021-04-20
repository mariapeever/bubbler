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
		ok: [ ...e.ok ],
		pending: [],
		flagged: [ ...e.flagged ],
		removed: [ ...e.removed ],
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	}
}

const prepareFetchPayload = payload => {
	
	var privCMsgList = {}
	privCMsgList[payload._id] = constructor(payload)

	return { payload: privCMsgList }
}


const prepareSSHPushPayload = payload => {

	var keys = ['_id','ok','flagged','removed','createdAt','updatedAt','__v']
	var saveAs = ['ok','flagged','removed','createdAt','updatedAt']

	var privCMsgList = {}

	payload = payload.replace(/^.*?{/, "{")
	
	var regex = /\(*\)*[^\w\d:(\d+-\d.),]*(ObjectId)*(ISODate)*/g
	payload = payload.replaceAll(regex, '')

	var _id;
	for(let i = 0; i < keys.length; i++) {
		let k = keys[i]

		let len = k.length
		let index = payload.indexOf(k) + len + 1
		if (i < keys.length - 1) {
			next = payload.indexOf(keys[i+1]) - 1
		} else {
			next = payload.length - 1
		}
		let substr = payload.substr(index, next - index)
		
		if (substr.indexOf(',') != -1) {
			substr = substr.split(",")
		}
		if(i != keys.length - 1 && saveAs.includes(k)) {
			privCMsgList[k] = substr
		} else if (k == '_id') {
			_id = substr
		}
	}

	return { 
		payload: {
			[_id]: {
				...privCMsgList,
				pending: []
			}
		}}
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
		    prepare(payload) {
		    	return prepareFetchPayload(payload)
		    }
		},
		privCMsgListPushed: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCMsgLists: { ...currentState.privCMsgLists, ...action.payload }}
		    },
		    prepare(payload) {
		    	
		    	return prepareSSHPushPayload(payload)
		    }
		}
	},
	extraReducers:  {}
})

export default privCMsgListsSlice.reducer

export const { privCMsgListFetched, privCMsgListPushed } = privCMsgListsSlice.actions

export const selectPrivCMsgLists = () => currentState.privCMsgLists

export const selectPrivCMsgListById = id => currentState.privCMsgLists[id]

export const selectPrivCMsgList_OK = id => currentState.privCMsgLists[id] ? currentState.privCMsgLists[id].ok : []
export const selectPrivCMsgList_Pending = id => currentState.privCMsgLists[id] ? currentState.privCMsgLists[id].pending : []
export const selectPrivCMsgList_Flagged = id => currentState.privCMsgLists[id] ? currentState.privCMsgLists[id].flagged : []
export const selectPrivCMsgList_Removed = id => currentState.privCMsgLists[id] ? currentState.privCMsgLists[id].removed : []

export const selectPrivCMsgListById_UpdatedAt = id => currentState.privCMsgLists[id] ?currentState.privCMsgLists[id].updatedAt : ''


