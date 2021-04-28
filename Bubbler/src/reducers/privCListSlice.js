
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
	privCList: {},
	status: 'idle',
	error: null
}

const status = ['active', 'pending', 'hidden', 'archived']

export const fetchPrivCList = createAsyncThunk('privCList', async id => {
	// accepts privCList ref from User
	var url = `http://localhost:8000/api/privc-lists/${id}`

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
	var privCList = {
		active: {},
		pending: {},
		hidden: {},
		archived: {},
		createdAt: payload.createdAt,
		updatedAt: payload.updatedAt
	}

	for (let [key, val] of Object.entries(privCList)) {
		if(status.includes(key)) {
			payload[key].forEach(e => {
				privCList[key] = { ...privCList[key], 
					...{ [e.privateChat]: { participant: e.participant }}}
			})
		}
	}
	return { payload: 
		{ [payload._id] : privCList }}
}

var currentState = initialState

export const privCListSlice = createSlice({
	name: 'privCList',
	initialState,
	reducers: {
		privCListFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCList: { ...currentState.privCList, ...action.payload }}
		    },
		    prepare(payload) {
		    	return preparePayload(payload)
		    }
		}

	},

	extraReducers:  {}
})

export default privCListSlice.reducer

export const { privCListFetched } = privCListSlice.actions

export const selectPrivCList = id => {
	Object.entries(currentState.privCList[id]).forEach(([key, value]) => {
		if (status.includes(key)) {
			currentState.privCList[id][key] = Object.keys(currentState.privCList[id][key])
		}
	})
	return currentState.privCList[id]
}

export const selectPrivCListParticipantByPrivCId = privCId => {
	var entries = currentState.privCList[selectPrivCListId()] ? 
		Object.entries(currentState.privCList[selectPrivCListId()]) : []
	for(let i = 0; i < entries.length; i++) {
		let [key, value] = entries[i]
		return (status.includes(key) && Object.keys(value).includes(privCId)) ? 
			value[privCId].participant : ''
	}
	return ''
}

export const selectPrivCListId = () => {
	return Object.keys(currentState.privCList)[0]
}

export const selectPrivCList_Active = (participant = false) => {
	if (currentState.privCList[selectPrivCListId()]) {
		return participant ? currentState.privCList[selectPrivCListId()].active : 
			Object.keys(currentState.privCList[selectPrivCListId()].active)
	} 
	return participant ? {} : []
}

export const selectPrivCList_Pending = (participant = false) => {
	if (currentState.privCList[selectPrivCListId]) {
		return participant ? currentState.privCList[selectPrivCListId()].pending : 
			Object.keys(currentState.privCList[selectPrivCListId()].pending)
	} 
	return participant ? {} : []
	
}
export const selectPrivCList_Hidden = (participant = false) => {
	if (currentState.privCList[selectPrivCListId]) {
		return participant ? currentState.privCList[selectPrivCListId()].hidden : 
			Object.keys(currentState.privCList[selectPrivCListId()].hidden)
	}
	return participant ? {} : []
}
export const selectPrivCList_Archived = (participant = false) => {
	if (currentState.privCList[selectPrivCListId]) {
		return participant ? currentState.privCList[selectPrivCListId()].archived : 
			Object.keys(currentState.privCList[selectPrivCListId()].archived)
	} 
	return participant ? {} : []
}




