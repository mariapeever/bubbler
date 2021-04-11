import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	privCList: { 
		id: '',
		active: {},
		pending: {},
		hidden: {},
		archived: {},
		updatedAt: '',
	},
	status: 'idle',
	error: null
}

const status = ['active', 'pending', 'hidden', 'archived']

export const fetchPrivCList = createAsyncThunk('privCList', async id => {
	// accepts privCList ref from User
	var url = `http://localhost:8000/api/privCLists/${id}`
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
		id: payload._id,
		updatedAt: payload.updated_at,
		active: {},
		pending: {},
		hidden: {},
		archived: {}
	}

	for (let [key, val] of Object.entries(privCList)) {
		if(status.includes(key)) {
			payload[key].forEach(e => {
				privCList[key] = { ...privCList[key], ...{ [e.privateChat]: { participant: e.participant }}}
			})
		}
	}

	return { payload: privCList }
}

var currentState = initialState

export const privCListSlice = createSlice({
	name: 'privCList',
	initialState,
	reducers: {
		privCListFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, privCList: action.payload }
		    },
		    prepare(action) {
		    	return preparePayload(action.payload)
		    }
		}
	},

	extraReducers:  {}
})

export default privCListSlice.reducer

export const { privCListFetched } = privCListSlice.actions

export const selectPrivCList = () => {
	Object.entries(currentState.privCList).forEach(([key, value]) => {
		if(status.includes(key)) {
			currentState.privCList[key] = Object.keys(currentState.privCList[key])
		}
	})
	return currentState.privCList
}
export const selectPrivCListId = () => currentState.privCList.id

export const selectActivePrivCList = () => Object.keys(currentState.privCList.active)
export const selectPendingPrivCList = () => Object.keys(currentState.privCList.pending)
export const selectHiddenPrivCList = () => Object.keys(currentState.privCList.hidden)
export const selectArchivedPrivCList = () => Object.keys(currentState.privCList.archived)

export const selectActivePrivCListObj = () => currentState.privCList.active
export const selectPendingPrivCListObj = () => currentState.privCList.pending
export const selectHiddenPrivCListObj = () => currentState.privCList.hidden
export const selectArchivedPrivCListObj = () => currentState.privCList.archived



