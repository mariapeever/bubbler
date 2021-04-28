import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux'

import { unwrapResult } from '@reduxjs/toolkit'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import FontAwesome from 'react-native-vector-icons/FontAwesome' 
FontAwesome.loadFont()

import {
	createPrivateChat,
	privateChatAdded,
	selectPrivateChatById
} from '../../reducers/privateChatsSlice'

import {
	selectTmpUsers,
	fetchUsersByRegex,
	usersFetchedByRegex,
	resetCurrentState_tmp
} from '../../reducers/usersSlice'

import {
	Text,
	Switch
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
	Page,
	Label,
	Toggle,
	ToggleButton
} from '../../styled'

const SelectContacts = ({ navigation }) => {
	
	const [query, setQuery] = useState([])
	const [contacts, setContacts] = useState([])
	const [users, setUsers] = useState([])
	const [mergedContacts, setMergedContacts] = useState([])

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [group, setGroup] = useState(false)

	const [privateChat, setPrivateChat] = useState('')

	const [privCStatus, setPrivCStatus] = useState('idle')
	const [groupCStatus, setGroupCStatus] = useState('idle')

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

	useEffect(() => {

		if (query.length > 1) {
			let loadedUsers = query.length > 3 ? loadUsers(query) : false
			let tmpUsers = loadedUsers ? selectTmpUsers() : false
			if (tmpUsers) setUsers(tmpUsers) 
		}

	}, [query])

	const findOrCreatePrivateChat = async id => {
		try {
			setPrivCStatus('pending')
			console.log('SelectContacts :: Searching for or creating a private chat')

			var privateChats = selectPrivateChats()
			var checkedExisting = false

			if (privateChats.length) {
				for(let i = 0; i < privateChats.length; i++) {
					let chat = privateChats[i]
					let particListId = chat.participantsList

					privCParticList = [
					    ...selectPrivCParticList_Active(particListId),
					    ...selectPrivCParticList_Pending(particListId),
					    ...selectPrivCParticList_Inactive(particListId),
					    ...selectPrivCParticList_Flagged(particListId),
					    ...selectPrivCParticList_Blocked(particListId),
					] : false
				  
				  	let privCParticipants_Users = privCParticList ? 
		            selectPrivCParticipants_Users(privCParticList) : []

		          	if(privCParticipants_Users.length == 1 && 
		          	   privCParticipants_Users[0].id == id) {
		          		setPrivateChat(privateChats[i])
		          		break
		          	} else if (i == privateChats.length) {
		          		checkedExisting = true
		          	}
				}
			}
			
			if (checkedExisting) {
				let createPrivCAction = await dispatch(
				    createPrivateChat({
				      	title: `${item.firstName} ${item.lastName}`,
				      	description: '',
				      	participants: {
				      		pending: [id]
				      	}
				    })
				).then(unwrapResult)

			    let createdPrivateChat = createPrivCAction ? dispatch(
			      privateChatAdded(createPrivCAction)
			    ) : false

			   	selectedPrivateChat = createdPrivateChat ? 
			   		selectPrivateChatById(createdPrivateChat.payload.id) : false

			    if (selectedPrivateChat) setPrivateChat(selectedPrivateChat)
			}
			
		} catch (err) {
			setPrivCStatus('failed')
			console.error('Update user failed: ', err)
		}  finally {
			setPrivCStatus('success')
			
			console.log('PrivateChat :: Message sent')
		}
  	}
	

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

	const dispatch = useDispatch()

	const loadUsers = async e  => {
	    var fetchedUsers = 
	      await dispatch(fetchUsersByRegex(e))
	              .then(unwrapResult)

	    var loadedUsers = fetchedUsers ? await dispatch(usersFetchedByRegex(fetchedUsers)) : false

	    if (loadedUsers) return true
	    return false
	}

	const renderedUser = ({ item }) => {

		var firstName = item.firstName
		var lastName =  item.lastName ? ` ${item.lastName}` : ''
		var username = item.username
		var status = item.status ? item.status : ''

		return(

			<SectionListing size='sm' 
				onPress={() => {
					if (group) {
						addToGroupChat(item.id) 
					} else {
						findOrCreatePrivateChat(item.id)
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

	const AddGroupContacts = ({ id }) => {
	  if (group) {
	    return (
			<>
				<CheckBox
					center
					  checkedIcon='dot-circle-o'
					  uncheckedIcon='circle-o'
					  checked='true'
					  onPress={() => addUserToGroup(id)}
				/>
			</>)
	  }
	  return (<></>)
	}

	
	return (

		<>
			<Toggle>
				<Label>Group Chat</Label>
				<ToggleButton
			        trackColor={{ false: "#767577", true: "#81b0ff" }}
			        thumbColor={group ? "#f5dd4b" : "#f4f3f4"}
			        ios_backgroundColor="#3e3e3e"
			        onValueChange={toggleGroup}
			        value={group}
			    />
			</Toggle>
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


export default SelectContacts
