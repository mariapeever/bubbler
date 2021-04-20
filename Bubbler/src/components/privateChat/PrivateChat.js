
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import nodejs from 'nodejs-mobile-react-native'

import { selectPrivateChatById } from '../../reducers/privateChatsSlice'

import { selectPrivCListParticipantByPrivCId } from '../../reducers/privCListSlice'

import { 
	fetchPrivCMessagesFromList, 
	privCMessagesFetchedFromList, 
	selectPrivCMessagesFromList, 
	createPrivCMessage, 
	privCMessageAdded } from '../../reducers/privCMessagesSlice'
	
import { 
	fetchPrivCMsgList, 
	privCMsgListFetched, 
	privCMsgListPushed,
	selectPrivCMsgList_OK,
	selectPrivCMsgList_Pending,
	selectPrivCMsgList_Flagged,
	selectPrivCMsgList_Removed,
	selectPrivCMsgLists,
	selectPrivCMsgListById_UpdatedAt } from '../../reducers/privCMsgListsSlice'


import { selectPrivCParticipantById } from '../../reducers/privCParticipantsSlice'
import { selectUserById } from '../../reducers/usersSlice'

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

const sortMessages = (ok, pending) => {

	let msgs = ok.concat(pending)
	return msgs.sort((a, b) => {
		let dateA = new Date(a.createdAt)
		let dateB = new Date(b.createdAt)

		if (dateA < dateB) return -1
		if (dateB > dateB) return 1
		return 0
	})
}

const PrivateChatScreen = ({ navigation }) => {
	const route = useRoute()
	const params = route.params

	const id = params.id

	const privateChat = selectPrivateChatById(id)
	const participant = selectPrivCListParticipantByPrivCId(id)
	const messagesListId = privateChat.messagesList

	const [title, setTitle] = useState(privateChat.title)
	const [privCMsgList_OK, setPrivCMsgList_OK] = useState(
		selectPrivCMsgList_OK(messagesListId))
	
	const [privCMsgList_Pending, setPrivCMsgList_Pending] = useState(
		selectPrivCMsgList_Pending(messagesListId))

	const [privCMsgList_Flagged, setPrivCMsgList_Flagged] = useState(
		selectPrivCMsgList_Flagged(messagesListId))

	const [privCMsgList_Removed, setPrivCMsgList_Removed] = useState(
		selectPrivCMsgList_Removed(messagesListId))
	
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

	const [privCMessages, setPrivCMessages] = useState(sortMessages(privCMessages_OK, privCMessages_Pending))

	const [updatedAt, setUpdatedAt] = useState(() => 
		selectPrivCMsgListById_UpdatedAt(messagesListId))

	const [msgContent, setMsgContent] = useState('A new message')

	const [msgType, setMsgType] = useState('text')

	const [addRequestStatus, setAddRequestStatus] = useState('idle')

	const canSend = msgContent && addRequestStatus === 'idle'

	const dispatch = useDispatch()

	const onMsgContentChanged = e => setMsgContent(e)

	useEffect(() => {

		const unsubscribe = () => {
			nodejs.start('PrivcMsgListsClient.js');
		    nodejs.channel.addListener(
		      'message',
		      async (msg) => {
		      	if (msg.indexOf('ObjectId') != -1) {
		      		console.log('SSH Push :: New message received.')
		      		pushMessages(msg) 
		      	} 
		      },
		      this
		    )
		}
		return unsubscribe
	})

	useEffect(() => {

	    const interval = setInterval(() => {
	  		console.log('SSH Push :: Listening for messages.')
	 
			const updatedAt = selectPrivCMsgListById_UpdatedAt(privateChat.messagesList)
			nodejs.channel.send({
				id: messagesListId, 
				updatedAt: updatedAt
			})
	    }, 300)
	    return () => clearInterval(interval);
	    
	}, [])

	const loadPrivCMessages = async privCMsgList  => {

	    const fetchedPrivCMessages = privCMsgList.length ? 
	      await dispatch(fetchPrivCMessagesFromList(privCMsgList))
	              .then(unwrapResult) : false
	    if (fetchedPrivCMessages) {
	    	dispatch(privCMessagesFetchedFromList(fetchedPrivCMessages))
	      return true
	    }
	    return false
	}

	const pushMessages = async (msgs) => {
		let list = await dispatch(privCMsgListPushed(msgs))
  		let reSelectedPrivCMsgList_OK = list ? selectPrivCMsgList_OK(messagesListId) : false
  		let reSelectedPrivCMsgList_Pending = list ? selectPrivCMsgList_Pending(messagesListId) : false

  		let mergedPrivCMsgList = [
  			reSelectedPrivCMsgList_OK, 
  			reSelectedPrivCMsgList_Pending].every(Boolean) ?
  			[...reSelectedPrivCMsgList_OK,
  			 ...reSelectedPrivCMsgList_Pending] : false

  		let reLoadedPrivMessages = mergedPrivCMsgList ? 
  			await loadPrivCMessages(mergedPrivCMsgList) : false
  		
  		let reSelectedPrivCMessages_OK = reLoadedPrivMessages ? 
  			selectPrivCMessagesFromList(reSelectedPrivCMsgList_OK) : false

  		let reSelectedPrivCMessages_Pending = reLoadedPrivMessages ? 
  			selectPrivCMessagesFromList(reSelectedPrivCMsgList_Pending) : false

  		let sortedPrivCMessages = [
  			reSelectedPrivCMessages_OK, 
  			reSelectedPrivCMessages_Pending].every(Boolean) ? 
  			sortMessages(reSelectedPrivCMessages_OK, reSelectedPrivCMessages_Pending) : false
  		
  		if (sortedPrivCMessages) setPrivCMessages(sortedPrivCMessages) 
	} 

	const onSendClicked = async () => {
  	
	  	if (canSend) {
	      try {
	        setAddRequestStatus('pending')

	        const resultAction = await dispatch(
	          createPrivCMessage({
	            privateChat: id,
	            participant: participant,
	            content: msgContent,
	            type: msgType
	          })
	        ).then(unwrapResult)

	        setAddRequestStatus('success')
	        
	        const added = await dispatch(
	          privCMessageAdded(resultAction)
	        )        
	        setMsgContent('')

	      } catch (err) {
	        setAddRequestStatus('failed')
	        console.error('Update user failed: ', err)
	      }  finally {
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

