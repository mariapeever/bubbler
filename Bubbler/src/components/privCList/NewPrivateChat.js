import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux'

import { unwrapResult } from '@reduxjs/toolkit'

import {
	selectPrivCParticList_Active,
	selectPrivCParticList_Pending,
	selectPrivCParticList_Inactive,
	selectPrivCParticList_Flagged,
	selectPrivCParticList_Blocked
} from '../../reducers/privCParticListsSlice'

import {
	selectPrivateChats,
} from '../../reducers/privateChatsSlice'

import {
	selectPrivCParticipants_Users
} from '../../reducers/privCParticipantsSlice'

import {
	selectTmpUsers,
	fetchUsersByRegex,
	usersFetchedByRegex
} from '../../reducers/usersSlice'

import {
	Text
} from 'react-native'

import { CheckBox } from 'react-native-elements'

import { 
	Avatar,
	Box,
	List,
	Input,
	Icon,
	SectionListing,
	SectionListingBorder,
	SectionListingContent,
	SectionListingTitle,
	SectionListingDescription,
	SectionListingLabel,
	Span,
	Label,
	Toggle
} from '../../styled'

import { PrivateChat } from '../privateChat'

import {useRoute} from '@react-navigation/native'

const NewPrivateChat = (props) => {
	
	const [modalVisible, setModalVisible] = props.modal
	const [query, setQuery] = useState([])
	const [contacts, setContacts] = useState([])
	const [users, setUsers] = useState([])
	const [mergedContacts, setMergedContacts] = useState([])

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [group, setGroup] = useState(false)

	const [privateChat, setPrivateChat] = useState({})
	const [privCStatus, setPrivCStatus] = useState('idle')
	const [groupCStatus, setGroupCStatus] = useState('idle')
	const [selected, setSelected] = useState(false)
	const [navState, setNavState] = useState('idle')

	const dispatch = useDispatch()

	const [focus, setFocus] = useState({
		title: false,
		description: false,
		query: false
	})

	const toggleFocus = field => {
		var update = {}
		Object.keys(focus).forEach(e => {
			update[e] = e === field ? true : false
		})
		setFocus(update)
	}

	const toggleGroup = () => setGroup(state => !state);

	const onQueryChanged = e => {
		toggleFocus('query')
		setQuery(e)
	}
	
	const onTitleChanged = e => {
		toggleFocus('title')
		setTitle(e)
	}

	const onDescriptionChanged = e => {
		toggleFocus('description')
		setDescription(e)
	}

	const findOrCreatePrivateChat = async user => {
 
		try {
			
			var privateChats = selectPrivateChats()
			var checkedExisting = false

			for(let i = 0; i < privateChats.length; i++) {
				let chat = privateChats[i]
				let particListId = chat.participantsList
				privCParticList = [
				    ...selectPrivCParticList_Active(particListId),
				    ...selectPrivCParticList_Pending(particListId),
				    ...selectPrivCParticList_Inactive(particListId),
				    ...selectPrivCParticList_Flagged(particListId),
				    ...selectPrivCParticList_Blocked(particListId),
				]
				
			  	let privCParticipants_Users = privCParticList.length ? 
	            	selectPrivCParticipants_Users(privCParticList) : []
	          	if (privCParticipants_Users.length == 1 && 
	          	    privCParticipants_Users[0] == user.id) {
	          		setPrivateChat(chat)
	          		setPrivCStatus('existing')
	          		break
	          	} 
			}

			if (privCStatus != 'existing' ||
				privateChats.length == 0) {
				setPrivCStatus('new')
			}
		
		} catch (err) {
			setPrivCStatus('failed')
		}  finally {
			console.log('PrivateChat :: Created')
		}
  	}

  	const loadUsersByRegex = async query => {
	    var fetchedUsers = 
	      	await dispatch(fetchUsersByRegex(query))
	              .then(unwrapResult)
	    var loadedUsers = fetchedUsers ? await dispatch(usersFetchedByRegex(fetchedUsers)) : false

	    if (loadedUsers) return true
	    return false
	}
  	
	useEffect(() => {

		if (query.length > 1) {
			let loadedUsers = query.length > 1 ? loadUsersByRegex(query) : false
			let tmpUsers = loadedUsers ? selectTmpUsers() : false
			if (tmpUsers.length) setUsers(tmpUsers) 
		}
	}, [query])

	useEffect(() => {
		if (selected) {
			if (privCStatus == 'pending') {
				if (group) {
					addToGroupChat(selected)
				} else {

					findOrCreatePrivateChat(selected)
				}
			} else if(privCStatus == 'existing' || 
			   		  privCStatus == 'new' ) {
				try {
					props.navigation.navigate('PrivCList')
					if (privCStatus == 'existing') {
						props.navigation.push(`PrivateChat-${privateChat.id}`, { id: privateChat.id })
					} else if (privCStatus == 'new') {
						props.navigation.dispatch(state => {
							let ObjectId = state.routeNames[1].split('-')[1]
						
							setModalVisible(!modalVisible)
							
							props.navigation.push('PrivateChat-'+ObjectId, { id: ObjectId, title: `${selected.firstName} ${selected.lastName}`, user: selected })
														
						})
					}
					setPrivCStatus('idle')
				} catch (err) {
					console.error(err)
				} finally {
				}
			}
		}

	}, [privCStatus])

	const ChatDetails = () => {
	  	if (group) {
		    return (
				<>	
					<Input
						id='title'
						name='title'
						value={title}
						placeholder='Title'
						textContentType='none'
						onChangeText={onTitleChanged}
						autoFocus = {focus.title}
					/>
					<Input
						id='description'
						name='description'
						value={description}
						placeholder='Descritpion'
						textContentType='none'
						onChangeText={onDescriptionChanged}
						autoFocus = {focus.description}
					/>
					<Box>
						<Avatar
							source={require('../../assets/images/avatar.png')}
						/>
					</Box>
				</>)
	  	}
	  	return (<></>)
	}
 
	const AddGroupContacts = item => {
	  if (group) {
	    return (
			<>
				<CheckBox
					center
					  checkedIcon='dot-circle-o'
					  uncheckedIcon='circle-o'
					  checked='true'
					  onPress={() => addUserToGroup(item.id)}
				/>
			</>)
	  }
	  return (<></>)
	}

	const renderedUser = ({ item }) => {

		var firstName = item.firstName
		var lastName =  item.lastName ? ` ${item.lastName}` : ''
		var username = item.username
		var status = item.status ? item.status : ''
		return(

			<SectionListing size='sm' 
				onPress={() => {
					if (privCStatus == 'idle') {
						setPrivCStatus('pending')
						setSelected(item)	
					}
				}} key={item.id}>
				<Avatar
					source={require('../../assets/images/avatar.png')}
				/>

				<SectionListingBorder>

					<SectionListingContent>
						<SectionListingTitle>{firstName}{lastName}</SectionListingTitle>
						<SectionListingDescription><Span>{username}</Span>{status}</SectionListingDescription>
						
					</SectionListingContent>
					<AddGroupContacts id={item.id}/>
				</SectionListingBorder>
				
			</SectionListing>)
	} 
	
	return (
		<>
			<ChatDetails />
			<Input
				id='query'
				name='query'
				value={query}
				placeholder='Search contacts...'
				textContentType='none'
				onChangeText={onQueryChanged}
				autofocus={focus.query}
			/>

			<List
				data={users}
		        renderItem={renderedUser}
		        keyExtractor={item => item.id} 
		    />    
		</>
	)
}


export default NewPrivateChat





























