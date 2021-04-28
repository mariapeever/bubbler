
import React, { useEffect, useState } from 'react'
import { pure } from 'recompose'

import { useDispatch, useSelector } from 'react-redux'

import nodejs from 'nodejs-mobile-react-native'

import { 
	selectPrivateChatById,
	createPrivateChat,
	privateChatAdded
} from '../../reducers/privateChatsSlice'

import { 
	selectPrivCListId,
	selectPrivCList,
	selectPrivCListParticipantByPrivCId,
	fetchPrivCList,
	privCListFetched } from '../../reducers/privCListSlice'

import { 
	fetchPrivCMessagesFromList, 
	privCMessagesFetchedFromList, 
	selectPrivCMessagesFromList, 
	createPrivCMessage, 
	privCMessageAdded } from '../../reducers/privCMessagesSlice'
	
import { 
	fetchPrivCMsgList, 
	privCMsgListFetched, 
	onePrivCMsgListPushed,
	selectPrivCMsgList_OK,
	selectPrivCMsgList_Pending,
	selectPrivCMsgList_Flagged,
	selectPrivCMsgList_Removed,
	selectPrivCMsgLists,
	selectPrivCMsgListById_UpdatedAt } from '../../reducers/privCMsgListsSlice'

import {
	selectPrivCParticList_System,
	selectPrivCParticList_Admin,
	selectPrivCParticList_Active,
	selectPrivCParticList_Pending,
	selectPrivCParticList_Inactive,
	selectPrivCParticList_Flagged,
	selectPrivCParticList_Blocked,
	fetchPrivCParticList,
	privCParticListFetched
} from '../../reducers/privCParticListsSlice'

import { 
	privCParticipantsFetchedFromList,
	fetchPrivCParticipantsFromList,
	selectPrivCParticipantById,
	selectPrivCParticipants_Users } from '../../reducers/privCParticipantsSlice'

import { 
	selectUserById,
	fetchUsersFromList,
	usersFetchedFromList
} from '../../reducers/usersSlice'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { unwrapResult } from '@reduxjs/toolkit'

import { 
	InteractionManager,
	Text, 
	View,
	TextInput } from 'react-native'

import { Container } from '../common'

import Theme from '../../styled/Theme'

import { 
	Page,
	Icon,
	IconButton,
	InputBox,
	BottomToolbar,
	MessageBubble,
	MessageInput,
	MessageText,
	SectionButtonTitle,
	SectionTitle,
	SectionListing,
	SectionListingTitle,
	SectionListingDescription,
	SectionListingLabel,
	SectionListingImage,
	SectionListingContent,
	SectionListingContainer,
	SectionListingBorder,
	Span,
	Stream,
	BodyText,
	PageHeader
} from '../../styled'

import {useRoute} from '@react-navigation/native';

const PrivateChatScreen = ({ navigation }) => {
	const route = useRoute()
	const params = route.params
	const id = params.id
	const [privateChat, setPrivateChat] = useState(selectPrivateChatById(id))
	const [participant, setParticipant] = useState(selectPrivCListParticipantByPrivCId(id))

	const sortMessages = (msgs) => {

		return msgs.sort((a, b) => {
			let dateA = new Date(a.createdAt)
			let dateB = new Date(b.createdAt)

			if (dateA < dateB) return -1
			if (dateB > dateB) return 1
			return 0
		})
	}

	const [title, setTitle] = useState(privateChat ? privateChat.title : '')

	const [privCMsgList_OK, setPrivCMsgList_OK] = useState(
		selectPrivCMsgList_OK(privateChat.messagesList))
	const [privCMsgList_Pending, setPrivCMsgList_Pending] = useState(
		selectPrivCMsgList_Pending(privateChat.messagesList))

	const [privCMsgList_Flagged, setPrivCMsgList_Flagged] = useState(
		selectPrivCMsgList_Flagged(privateChat.messagesList))

	const [privCMsgList_Removed, setPrivCMsgList_Removed] = useState(
		selectPrivCMsgList_Removed(privateChat.messagesList))
	
	const [privCMessages_OK, setPrivCMessages_OK] = useState(() => {
		return privCMsgList_OK.length ? 
			selectPrivCMessagesFromList(privCMsgList_OK) : []
	})

	const [privCMessages_Pending, setPrivCMessages_Pending] = useState(() => {
		return privCMsgList_Pending.length ? 
			selectPrivCMessagesFromList(privCMsgList_Pending) : []
	})
	
	const [privCMessages_Flagged, setPrivCMessages_Flagged] = useState(() => {
		return privCMsgList_Flagged.length ? 
			selectPrivCMessagesFromList(privCMsgList_Flagged) : []
	})

	const [privCMessages_Removed, setPrivCMessages_Removed] = useState(() => {
		return privCMsgList_Removed.length ? 
			selectPrivCMessagesFromList(privCMsgList_Removed) : []
	})

	const [privCMessages, setPrivCMessages] = useState(
		sortMessages([...privCMessages_OK, ...privCMessages_Pending]))

	const [updatedAt, setUpdatedAt] = useState(() => 
		selectPrivCMsgListById_UpdatedAt(privateChat.messagesList))
	const [msgContent, setMsgContent] = useState('A new message')
	const [msgType, setMsgType] = useState('text')

	const [addRequestStatus, setAddRequestStatus] = useState('idle')

	const [pushing, setPushing] = useState('idle')

	const canSend = msgContent && addRequestStatus === 'idle'

	const dispatch = useDispatch()

	const onMsgContentChanged = e => setMsgContent(e)

	useEffect(() => {
	   // Subscribe for the focus Listener
	  const unsubscribe = navigation.addListener('focus', async () => {

	  	if (params.title) navigation.setOptions({ title: params.title  })

	  	let reSelectedPrivateChat = id ? selectPrivateChatById(id) : false
	  	if (reSelectedPrivateChat) setPrivateChat(reSelectedPrivateChat)
	  	if (reSelectedPrivateChat) setTitle(reSelectedPrivateChat.title)
	  	let reSelectedPrivCMsgList_OK = privateChat.messagesList ? selectPrivCMsgList_OK(privateChat.messagesList) : false

	  	if (reSelectedPrivCMsgList_OK) setPrivCMsgList_OK(reSelectedPrivCMsgList_OK)
	  	let reSelectedPrivCMsgList_Pending = privateChat.messagesList ? selectPrivCMsgList_Pending(privateChat.messagesList) : false
		if (reSelectedPrivCMsgList_Pending) setPrivCMsgList_Pending(reSelectedPrivCMsgList_Pending)

		let reSelectedPrivCMsgList_Flagged = privateChat.messagesList ? selectPrivCMsgList_Flagged(privateChat.messagesList) : false
		if (reSelectedPrivCMsgList_Flagged) setPrivCMsgList_Flagged(selectPrivCMsgList_Flagged(privateChat.messagesList))

		let reSelectedPrivCMsgList_Removed = privateChat.messagesList ? selectPrivCMsgList_Removed(privateChat.messagesList) : false
		if (reSelectedPrivCMsgList_Removed) setPrivCMsgList_Removed(selectPrivCMsgList_Removed(privateChat.messagesList))
		

		setPrivCMessages_OK(reSelectedPrivCMsgList_OK.length ? 
				selectPrivCMessagesFromList(reSelectedPrivCMsgList_OK) : [])
		setPrivCMessages_Pending(reSelectedPrivCMsgList_Pending.length ? 
				selectPrivCMessagesFromList(reSelectedPrivCMsgList_Pending) : [])
		
		setPrivCMessages_Flagged(reSelectedPrivCMsgList_Flagged.length ? 
				selectPrivCMessagesFromList(reSelectedPrivCMsgList_Flagged) : [])

		setPrivCMessages_Removed(reSelectedPrivCMsgList_Removed.length ? 
				selectPrivCMessagesFromList(reSelectedPrivCMsgList_Removed) : [])

		if([reSelectedPrivCMsgList_OK.length, 
			reSelectedPrivCMsgList_Pending.length].some(Boolean)) 
			setPrivCMessages(sortMessages([...privCMessages_OK, ...privCMessages_Pending]))
		if (privateChat.messagesList) setUpdatedAt(() => selectPrivCMsgListById_UpdatedAt(privateChat.messagesList))

	  })
	  return unsubscribe
	}, [navigation])

	useEffect(() => {
		let mounted = true
		nodejs.start('SSHClient.js');
	    nodejs.channel.addListener(
	      'message',
	      (msg) => {

	      	if (msg.indexOf('ObjectId') != -1 && mounted) {
	      		pushMessages(msg)
				setPushing('pending')	      		
	      	} 
	      },
	      this
	    )
	    return cleanup = () => mounted = false
	})

	useEffect(() => {

		if (pushing === 'idle') {
		    const interval = setInterval(() => {
		  		// console.log('SSH Push :: Listening for messages.')

				nodejs.channel.send({
					filter: privateChat.messagesList, 
					updatedAt: updatedAt,
					query: 'privcmsglists_findone'
				})
		    }, 300)
		    return () => clearInterval(interval);
		}
	    
	}, [])

	const loadPrivCMessages = async privCMsgList  => {
		// console.log('PrivateChat :: Loading messages...')

	    const fetchedPrivCMessages = privCMsgList.length ? 
	      await dispatch(fetchPrivCMessagesFromList(privCMsgList))
	              .then(unwrapResult) : false
	    const loadedPrivCMessages = fetchedPrivCMessages ? 
	    	await dispatch(privCMessagesFetchedFromList(fetchedPrivCMessages)) : false

	    if (loadedPrivCMessages) return true
	    return false
	}

	const loadPrivCList = async privCListId => {
		const fetchedPrivCList = privCListId != '' ? 
		  await dispatch(fetchPrivCList(privCListId))
		          .then(unwrapResult) : false
		if (fetchedPrivCList) {
		  	var loadedPrivCList = await dispatch(privCListFetched(fetchedPrivCList))
		  	setParticipant(loadedPrivCList.payload[selectPrivCListId()].active[id].participant)
		
		  return true
		}
		return false
	}

	const pushMessages = async (msg) => {
		if (pushing === 'pending') {
			// console.log('PrivateChat :: Pushing messages...')
			try {
				let list = await dispatch(onePrivCMsgListPushed(msg))
		  		let reSelectedPrivCMsgList_OK = list ? 
		  			selectPrivCMsgList_OK(privateChat.messagesList) : []
		  		let reSelectedPrivCMsgList_Pending = list ? 
		  			selectPrivCMsgList_Pending(privateChat.messagesList) : []
		  		let mergedPrivCMsgList = [
		  			reSelectedPrivCMsgList_OK.length, 
		  			reSelectedPrivCMsgList_Pending.length].some(Boolean) ?
		  			[...reSelectedPrivCMsgList_OK,
		  			 ...reSelectedPrivCMsgList_Pending] : []
		  		let reLoadedMessages = mergedPrivCMsgList.length ? await loadPrivCMessages(mergedPrivCMsgList) : false
		  		let reSelectedPrivCMessages_OK = reLoadedMessages ? 
		  			selectPrivCMessagesFromList(reSelectedPrivCMsgList_OK) : []
		  		let reSelectedPrivCMessages_Pending = reLoadedMessages ? 
		  			selectPrivCMessagesFromList(reSelectedPrivCMsgList_Pending) : []
		  		let sortedPrivCMessages = [
		  			reSelectedPrivCMessages_OK.length, 
		  			reSelectedPrivCMessages_Pending.lenght].some(Boolean) ? 
		  			sortMessages([...reSelectedPrivCMessages_OK, 
				  				  ...reSelectedPrivCMessages_Pending]) : []
		  		if (sortedPrivCMessages) setPrivCMessages(sortedPrivCMessages)
		  		setPushing('success')
			} catch (err) {
				console.error('Pushing messages: ', err)
				setPushing('fail')
			} finally {
				setPushing('idle')
				// console.log('PrivateChat :: Pushing messages complete')
			}
		}
	}

	const loadPrivCMsgList = async privCMsgListId => {

		const fetchedPrivCMsgList = privCMsgListId != '' ? 
			await dispatch(fetchPrivCMsgList(privCMsgListId))
		    	.then(unwrapResult) : false
		if (fetchedPrivCMsgList) {
			dispatch(privCMsgListFetched(fetchedPrivCMsgList))
			return true
		}
		return false
	}


	const loadPrivCParticList = async privCParticListId => {

		const fetchedPrivCParticList = privCParticListId != '' ? 
	  		await dispatch(fetchPrivCParticList(privCParticListId))
	        	.then(unwrapResult) : false

		if (fetchedPrivCParticList) {
		  	dispatch(privCParticListFetched(fetchedPrivCParticList))
		  	return true
		}
		return false
	}

	const loadPrivCParticipants = async privCParticList  => {

		const fetchedPrivCParticipants = privCParticList.length ? 
	  		await dispatch(fetchPrivCParticipantsFromList(privCParticList))
	        	.then(unwrapResult) : false

		if (fetchedPrivCParticipants) {
			dispatch(privCParticipantsFetchedFromList(fetchedPrivCParticipants))
			return true
		}
		return false
	}

	const loadUsers = async usersList  => {
		const fetchedUsers = usersList.length ? 
		  	await dispatch(fetchUsersFromList(usersList))
		        .then(unwrapResult) : false

		if (fetchedUsers) {
			var usersFetched = await dispatch(usersFetchedFromList(fetchedUsers))
			return true
		}
		return false
	}

	const onSendClicked = async () => {
  	
	  	if (canSend) {
	      try {
	  	
	        setAddRequestStatus('pending')

	        if (!privateChat) {
	        	
	        	var contact = params.user
		        let createPrivCAction = await dispatch(
				    createPrivateChat({
				    	_id: id,
				      	title: `${contact.firstName} ${contact.lastName}`,
				      	description: 'A private chat.',
				      	participants: {
				      		pending: [contact.id]
				      	}
				    })
				).then(unwrapResult)

				var addedPrivateChat = await dispatch(
				    privateChatAdded(createPrivCAction)
				) 
				console.log('addedPrivateChat',addedPrivateChat)

				var loadedPrivCList = loadPrivCList(selectPrivCListId())
				setPrivateChat(selectPrivateChatById(id))
				let loadedPrivCMsgList = loadPrivCMsgList(privateChat.messagesList)
				let privCMsgList = []

				privCMsgList = loadedPrivCMsgList ? [
					...selectPrivCMsgList_OK(privateChat.messagesList),
					...selectPrivCMsgList_Pending(privateChat.messagesList),
					...selectPrivCMsgList_Flagged(privateChat.messagesList),
					...selectPrivCMsgList_Removed(privateChat.messagesList)
				] : []
				let loadedPrivCMessages = loadPrivCMessages(privCMsgList)
		
				let particListId = privateChat.participantsList
				let loadedPrivCParticList = loadPrivCParticList(particListId)
				let privCParticList = []

				privCParticList = privateChat.messagesList ? [
					...selectPrivCParticList_System(particListId),
					...selectPrivCParticList_Admin(particListId),
					...selectPrivCParticList_Active(particListId),
					...selectPrivCParticList_Pending(particListId),
					...selectPrivCParticList_Inactive(particListId),
					...selectPrivCParticList_Flagged(particListId),
					...selectPrivCParticList_Blocked(particListId)
				] : []

				let loadedPrivCParticipants = loadPrivCParticipants(privCParticList)
				let privCParticipants_Users = loadedPrivCParticipants ? 
					selectPrivCParticipants_Users(privCParticList) : []
				let loadedUsers = loadUsers(privCParticipants_Users)
	        }

	        const resultAction = await dispatch(
	          createPrivCMessage({
	            privateChat: id,
	            participant: participant,
	            content: msgContent,
	            type: msgType
	          })
	        ).then(unwrapResult)
	        setAddRequestStatus('success')
	        
	        dispatch(
	          privCMessageAdded(resultAction)
	        )        
	        setMsgContent('')

	      } catch (err) {
	        setAddRequestStatus('failed')
	        console.error('Update user failed: ', err)
	      }  finally {
	      	// console.log('PrivateChat :: Message sent')
	        setAddRequestStatus('idle')
	      }
	  	}
  	}

	const renderedMessage = ({ item, index }) => {
		let nextSelf = index < privCMessages.length - 1 ? 
				privCMessages[index+1].participant == participant ? true : false : false

		let self = item.participant == participant ? true : false

		let msgParticipant = selectPrivCParticipantById(item.participant)
		let user = msgParticipant ? selectUserById(msgParticipant.user) : false
		return(
		  	<MessageBubble self={self} nextSelf={nextSelf}>
				<BodyText white={self ? true : false}><Span>{!self ? user ? `${user.firstName} `: '' : '' }</Span>{item.content}</BodyText>
			</MessageBubble>)
	}

	return(
		<Page>

			<PageHeader/>
			<Stream
				data={privCMessages}
		        renderItem={renderedMessage}
		        keyExtractor={item => item.id}
		    />
			<BottomToolbar>
				<InputBox>
					<MessageInput
						id='msgContent'
						name='msgContent'
						value={msgContent}
						placeholder='Type here...'
						textContentType='none'
						onChangeText={onMsgContentChanged} />
					<IconButton.Button
						backgroundColor="transparent"
						color={Theme.background.fadedMainHightlight}
						name='send'
						onPress={onSendClicked}
					/>
				</InputBox>
			</BottomToolbar>	
		</Page>)
}

const PrivateChat = ({ navigation }) => {
  return(
  	<Container screen={<PrivateChatScreen navigation={ navigation }/>} />
  )
}
export default PrivateChat

