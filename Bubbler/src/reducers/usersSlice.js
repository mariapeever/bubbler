import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	users: {},
	tmp: {},
	status: 'idle',
	error: null
}

export const login = createAsyncThunk('user', async login => {
	return await fetch('http://localhost:8000/api/auths/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
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

export const fetchUsersFromList = createAsyncThunk('user', async list => {

	let ids = list.toString()
	if (ids) {
		var url = `http://localhost:8000/api/users/find?ids=${ids}`
		return await fetch(url)
		    .then(response => response.json())
				.then(data => {

					return data
				})
					.catch(error =>{
						console.error(error)
					})
	}
	
	
})

export const fetchUsersByRegex = createAsyncThunk('user', async regex => {
	
	var url = `http://localhost:8000/api/users/regex/${regex}`
	return await fetch(url)
	    .then(response => response.json())
			.then(data => {
				return data
			})
				.catch(error =>{
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

const constructor = e => {
	return {
		firstName: e.firstName,
		lastName: e.lastName, 
		email: e.email ? e.email : '', 
		mobile: e.mobile ? e.mobile : '', 
		image: e.image ? e.image : '', 
		status: e.status ? e.status : '', 
		profile: e.profile ? e.profile : '', 
		contacts: e.contacts ? e.contacts : '', 
		createdAt: e.createdAt ? e.createdAt : '', 
		updatedAt: e.updatedAt ? e.updatedAt : ''
	}
}

const prepareUsersPayload = (payload) => {
	var users = {}
	payload.forEach(e => {
		users[e._id] = constructor(e)
	})

	return { payload: users }
}

var currentState = initialState

export const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		usersFetchedFromList: {
		    reducer(state, action) {
		    	currentState = { ...currentState, users: { ...currentState.users, ...action.payload }}
		    },
		    prepare(payload) {

		    	return prepareUsersPayload(payload)
		    }
		},
		usersFetchedByRegex: {
		    reducer(state, action) {
		    	currentState = { ...currentState, tmp: action.payload }
		    },
		    prepare(payload) {

		    	return prepareUsersPayload(payload)
		    }
		},
		userFetched: {
		    reducer(state, action) {
		    	currentState = { ...currentState, 
		    		users: { ...currentState.users, 
		    			...{ [action.payload.id]: action.payload } }}
		    },
		    prepare(payload) {
		    	return preparePayload(payload)
		    }
		},
		userAdded: {
			reducer(state, action) {
		      	currentState = { ...currentState, 
		    		users: { ...currentState.users, 
		    			...{ [action.payload.id]: action.payload } }}
		    },
		    prepare(payload) {
		    	return preparePayload(payload)
		    }
		},
		userUpdated: {
			reducer(state, action) {
				currentState = { ...currentState, 
		    		users: { ...currentState.users, 
		    			...{ [action.payload.id]: action.payload } }}
			},
			prepare(payload) {
				return preparePayload(payload)
			}
		},
		userLoggedIn: {
			reducer(state, action) {
		      	currentState = { ...currentState, 
		    		users: { ...currentState.users, 
		    			...{ [action.payload.id]: action.payload } }}
		    },
		    prepare(payload) {
		    	return preparePayload(payload)
		    }
		}
	},

	extraReducers:  {}
})

export default usersSlice.reducer

export const { userFetched, usersFetchedFromList, usersFetchedByRegex, userAdded, userUpdated, userLoggedIn } = usersSlice.actions

export const selectUserId = () => Object.keys(currentState.users)[0]
export const selectUser = () => {
	let id = selectUserId()
	return { ...currentState.users[id], id: id }
}

export const selectUserById = id => {
	return { ...currentState.users[id], id: id }
}

export const selectUsersFromList = userList => { 
	return usersList.map(e => { 
		return { ...currentState.users[e], id: e }
	})
}

export const selectUsers = () => {
	return Object.entries(currentState.users).map(([key, value]) => {
		return { ...value, id: key }
	})
}

export const selectTmpUsers = () => {
	return Object.entries(currentState.tmp).map(([key, value]) => {
		return { ...value, id: key }
	})
}

export const resetCurrentState_tmp = () => currentState.tmp = {}
