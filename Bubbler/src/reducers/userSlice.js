import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	user: {},
	others: {},
	status: 'idle',
	error: null
}

export const login = createAsyncThunk('user', async loginDetails => {
	return await fetch('http://localhost:8000/api/auths/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    })
	    .then((response) => response.json())
			.then((data) => {
				return data
			})
				.catch((error) =>{
					console.error(error)
				}) 
})

export const fetchUser = createAsyncThunk('user', async id => {

	var url = `http://localhost:8000/api/users/${id}`
	
	return await fetch(url)
	    .then((response) => response.json())
			.then((user) => {
				return user
			})
				.catch((error) =>{
					console.error(error)
				}) 
})

export const createUser = createAsyncThunk('user', async user => {
	
	return await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
	    .then((response) => response.json())
			.then((data) => {
				return data
			})
				.catch((error) =>{
					console.error(error)
				}) 
})

export const updateUser = createAsyncThunk('user', async user => {
	var url = `http://localhost:8000/api/users/update/${user.id}`
	
	return await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => response.json())
		.then((data) => {
			return data
		})
			.catch((error) =>{
				console.error(error)
			}) 
})

const preparePayload = (payload) => {
	var user = Object.assign({}, {
		id: payload._id,
		username: payload.username,
		firstName: payload.firstName,
		lastName: payload.lastName, 
		dob: payload.dob, 
		email: payload.email ? payload.email : '', 
		mobile: payload.mobile ? payload.mobile : '', 
		image: payload.image ? payload.image : '', 
		status: payload.status ? payload.status : '', 
		privacy: {
			firstName: payload.privacy ? 
				payload.privacy.firstName ? 
					payload.privacy.firstName :'public' : 'public',
			lastName: payload.privacy ? 
				payload.privacy.lastName ? 
					payload.privacy.lastName : 'public' : 'public',
			dob: payload.privacy ? 
				payload.privacy.dob ? 
					payload.privacy.dob : 'private' : 'private',
			email: payload.privacy ? 
				payload.privacy.email ? 
					payload.privacy.email : 'private' : 'private',
			mobile: payload.privacy ? 
				payload.privacy.mobile ? 
					payload.privacy.mobile : 'private' : 'private',
			image: 
				payload.privacy ? 
					payload.privacy.image ? 
						payload.privacy.image : 'public' : 'public',
			status: 
				payload.privacy ? 
					payload.privacy.status ?
						payload.privacy.status: 'contacts' : 'contacts',
		},
		wall: payload.wall ? payload.wall : '', 
		profile: payload.profile ? payload.profile : '', 
		contacts: payload.contacts ? payload.contacts : '', 
		privateChats: payload.privateChats ? payload.privateChats : '', 
		liveChats: payload.liveChats ? payload.liveChats : '', 
		calls: payload.calls ? payload.calls : '', 
		createdAt: payload.createdAt ? payload.createdAt : '', 
		updatedAt: payload.updatedAt ? payload.updatedAt : ''
	})
	return { payload: user }
}

const prepareAnotherUserPayload = (payload) => {
	var anotherUser = Object.assign({}, {
		id: payload._id,
		firstName: payload.firstName,
		lastName: payload.lastName, 
		email: payload.email ? payload.email : '', 
		mobile: payload.mobile ? payload.mobile : '', 
		image: payload.image ? payload.image : '', 
		status: payload.status ? payload.status : '', 
		profile: payload.profile ? payload.profile : '', 
		contacts: payload.contacts ? payload.contacts : '', 
		createdAt: payload.createdAt ? payload.createdAt : '', 
		updatedAt: payload.updatedAt ? payload.updatedAt : ''
	})
	return { payload: anotherUser }
}

var currentState = initialState

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		anotherUserFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, others: { ...currentState.others, ...{ [action.payload.id]: action.payload } }}
		    },
		    prepare(action) {

		    	return prepareAnotherUserPayload(action.payload)
		    }
		},
		userFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, user: action.payload }
		    },
		    prepare(action) {
		    	return preparePayload(action.payload)
		    }
		},
		userAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, user: action.payload }
		    },
		    prepare(action) {
		    	return preparePayload(action.payload)
		    }
		},
		userUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, user: action.payload }
			},
			prepare(action) {
				return preparePayload(action.payload)
			}
		},
		userLoggedIn: {
			reducer(state, action) {
		      	currentState = { ...currentState, user: action.payload }
		    },
		    prepare(action) {
		    	return preparePayload(action.payload)
		    }
		}
	},

	extraReducers:  {}
})

export default userSlice.reducer

export const { userFetched, anotherUserFetched, userAdded, userUpdated, userLoggedIn } = userSlice.actions

export const selectUser = () => currentState.user
export const selectUserId = () => currentState.user.id
export const selectUserPrivCListId = () => currentState.user.privateChats
export const selectAnotherUserById = id => currentState.others[id]

