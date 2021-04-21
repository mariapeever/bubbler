
import React, { useEffect, useState } from 'react'
import { pure } from 'recompose'

import { useDispatch } from 'react-redux'

import nodejs from 'nodejs-mobile-react-native'

import { extractId } from '../../utils'
import { selectUserById } from '../../reducers/usersSlice'
import { 
	selectPrivCList_Active,

} from '../../reducers/privCListSlice'
import { selectPrivateChatsFromList } from '../../reducers/privateChatsSlice'

import { 
	privCMsgListPushed,
	selectPrivCMsgList_OK,
	selectPrivCMsgList_Pending,
	selectPrivCMsgListById_UpdatedAt } from '../../reducers/privCMsgListsSlice'

import { 
	fetchPrivCMessagesFromList,
	privCMessagesFetchedFromList,
	selectPrivCMessageById, 
	selectLastMessageFromList,
	selectPrivCMessagesFromList } from '../../reducers/privCMessagesSlice'
import { selectPrivCParticipantById } from '../../reducers/privCParticipantsSlice'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { unwrapResult } from '@reduxjs/toolkit'

import { 
	InteractionManager,
	View, 
	FlatList, 
	TouchableOpacity, 
	Text, 
	Button } from 'react-native'

import { Container } from '../common'

import { dateToTimeDateLabel } from '../../utils'

import { 
	Page,
	Icon,
	Avatar,
	List,
	PageTitle,
	SectionButtonTitle,
	SectionTitle,
	SectionListing,
	SectionListingTitle,
	SectionListingDescription,
	SectionListingLabel,
	SectionListingContent,
	SectionListingContainer,
	SectionListingBorder,
	Span
} from '../../styled'

import PrivCListHeader from './PrivCListHeader'



const PrivCListScreen = ({ navigation }) => {
	
	const selectPrivateChats_Active = () => {
		const privCList_Active = selectPrivCList_Active()
		return selectPrivateChatsFromList(privCList_Active) 
	}

	const selectLastMsg = (privCMsgListId) => {
		let privCMsgList_OK = privCMsgListId != '' ? 
			selectPrivCMsgList_OK(privCMsgListId) : false
		
  		let privCMsgList_Pending = privCMsgListId != '' ? 
  			selectPrivCMsgList_Pending(privCMsgListId) : false
  		
  		let privCMessages_OK = privCMsgList_OK ? 
  			selectPrivCMessagesFromList(privCMsgList_OK) : false
  		let privCMessages_Pending = privCMsgList_Pending ? 
  			selectPrivCMessagesFromList(privCMsgList_Pending) : false

  		let sortedPrivCMessages = [
  			privCMessages_OK, 
  			privCMessages_Pending].every(Boolean) ? 
  			sortMessages(privCMessages_OK, privCMessages_Pending) : false

  		let sortedPrivCMessagesIds = sortedPrivCMessages.map(e => e.id)

  		return sortedPrivCMessages.length ? 
  			selectLastMessageFromList(sortedPrivCMessagesIds) : false
	}

	const selectMsgUser = (msgParticipantId) => {
		let msgParticipant = msgParticipantId ? selectPrivCParticipantById(msgParticipantId) : false	
		return msgParticipant ? selectUserById(msgParticipant.user) : false
	}

	const selectLastMsgProperty = (prop, messagesListId)  => {
		let lastMsg = selectLastMsg(messagesListId)
		return lastMsg ? lastMsg[prop] : false
	}

	const selectPrivateChatsLastMsgProperty = prop => {
		return privateChats.map(e => selectLastMsgProperty(prop, e.messagesList))
	}

	const sortMessages = (msgs) => {

		return msgs.sort((a, b) => {
			let dateA = new Date(a.createdAt)
			let dateB = new Date(b.createdAt)

			if (dateA < dateB) return -1
			if (dateB > dateB) return 1
			return 0
		})
	}

	const [privateChats, setPrivateChats] = useState(
		selectPrivateChats_Active())

	const [privCMsgLists_OK, setPrivCMsgLists_OK] = useState(privateChats.map(e => 
		selectPrivCMsgList_OK(e.messagesList)))
		
	const [privCMsgLists_Pending, setPrivCMsgLists_Pending] = useState(privateChats.map(e => 
		selectPrivCMsgList_Pending(e.messagesList)))

	const [privCMessages_OK, setPrivCMessages_OK] = useState(privCMsgLists_OK.map((e, i) => {
		return e.length ? 
			selectPrivCMessagesFromList(e) : []
	}))

	const [privCMessages_Pending, setPrivCMessages_Pending] = useState(privCMsgLists_Pending.map((e, i) => {
		return e.length ? 
			selectPrivCMessagesFromList(e) : []
	}))

	const [privCMessages, setPrivCMessages] = useState(sortMessages(
		[...privCMessages_OK, ...privCMessages_Pending]))

	const [pushing, setPushing] = useState({status: 'idle', index: ''})
	
	const [updatedAt, setUpdatedAt] = useState(privateChats.map(e => 
		selectPrivCMsgListById_UpdatedAt(e.messagesList)))

	const [lastMsgsContent, setLastMsgsContent] = useState(
		selectPrivateChatsLastMsgProperty('content'))

	const [lastMsgsCreatedAt, setLastMsgsCreatedAt] = useState(
		selectPrivateChatsLastMsgProperty('createdAt').map(e => {
			return e ? dateToTimeDateLabel(e) : false
		})
	)

	const [lastMsgsUserFirstName, setLastMsgsUserFirstName] = useState(() => {
		var lastMsgParticipants = selectPrivateChatsLastMsgProperty('participant')
		return lastMsgParticipants.map(e => selectMsgUser(e).firstName)
	})
	
	useEffect(() => {
		nodejs.start('PrivcMsgListsClient.js');
	    nodejs.channel.addListener(
	      'message',
	      async (msg) => {
	      	// console.log('PrivCList :: Listening for messages...')
	      	if (msg.indexOf('ObjectId') != -1) {
	      		// console.log('SSH Push :: New message received', msg)
	      		pushMessages(msg) 
	      	} 
	      },
	      this
	    )
	})

	useEffect(() => {
		var interval = setInterval(() => {
			let updatedAt = selectPrivCMsgListById_UpdatedAt(privateChats[0].messagesList)
		 			
	  		// console.log('SSH Push :: Checking for messages...')
			nodejs.channel.send({
				id: privateChats[0].messagesList, 
				updatedAt: updatedAt
			})
		}, 500)
		return () => clearInterval(interval);

	}, [])

	useEffect(() => {
		if (pushing.status === 'complete') {
			let privCMsgListId = pushing.index
			let privCMsgListsIds = privateChats.map(e => e.messagesList)
			let index = privCMsgListsIds.indexOf(privCMsgListId)

			setUpdatedAt(updatedAt.map((e, i) => i === index ? 
					selectPrivCMsgListById_UpdatedAt(privCMsgListId) : e))

			setLastMsgsContent(lastMsgsContent.map((e, i) => i === index ?
				selectLastMsgProperty('content', privCMsgListId) : e))

			setLastMsgsCreatedAt(lastMsgsCreatedAt.map((e, i) => i === index ?
				dateToTimeDateLabel(selectLastMsgProperty('createdAt', privCMsgListId)) : e))

			setLastMsgsUserFirstName(lastMsgsUserFirstName.map((e, i) => {
				if (i === index) {
					var lastMsgParticipant = selectLastMsgProperty('participant', privCMsgListId) 
					return selectMsgUser(lastMsgParticipant).firstName
				}
				return e
			}))
			setPushing({status: 'idle', index: ''})
		}
			
	})

	const loadPrivCMessages = async privCMsgList  => {
		// console.log('PrivCList :: Loading messages...')
	    const fetchedPrivCMessages = privCMsgList.length ? 
	      await dispatch(fetchPrivCMessagesFromList(privCMsgList))
	              .then(unwrapResult) : false
	    if (fetchedPrivCMessages) {
	    	var test = await dispatch(privCMessagesFetchedFromList(fetchedPrivCMessages))
	      	return true
	    }
	    return false
	}

	const pushMessages = async (msg) => {
		try {
			console.log('PrivCList :: Pushing messages...')
			
			let privCMsgListPayload = await dispatch(privCMsgListPushed(msg))
			let privCMsgListId = extractId(privCMsgListPayload)
	  		let reSelectedPrivCMsgList_OK = privCMsgListId ? selectPrivCMsgList_OK(privCMsgListId) : false

	  		let reSelectedPrivCMsgList_Pending = privCMsgListId ? selectPrivCMsgList_Pending(privCMsgListId) : false
	  		
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
	  			sortMessages([...reSelectedPrivCMessages_OK, ...reSelectedPrivCMessages_Pending]) : false

	  		let pushedPrivCMessages = sortedPrivCMessages ? setPrivCMessages(sortedPrivCMessages) : false
	  		
	  		
	  		setPushing({status: 'complete', index: privCMsgListId})


		} catch (err) {
			
			console.log('PrivCList :: Pushing messages: ', err)
		} finally {
			console.log('PrivCList :: Pushing messages complete')
		}
	} 


	const dispatch = useDispatch()

	const renderedPrivateChat = ({ item, index }) => {

		let lastMsgContent = lastMsgsContent[index]
		lastMsgContent = lastMsgContent ? lastMsgContent : 'No messages yet.'
		let lastMsgCreatedAt = lastMsgsCreatedAt[index]
		lastMsgCreatedAt = lastMsgCreatedAt ? lastMsgCreatedAt : ''

		let lastMsgUserFirstName = lastMsgsUserFirstName[index]
		lastMsgUserFirstName = lastMsgUserFirstName ? `${lastMsgUserFirstName}: ` : ''

		return(

			<SectionListing onPress={() => navigation.push('PrivateChat-'+item.id, {id: item.id})} key={item.id}>
				<Avatar
					source={require('../../assets/images/avatar.png')}
				/>
				<SectionListingBorder>
					<SectionListingContent>
						<SectionListingTitle>{item.title}</SectionListingTitle>
						<SectionListingDescription><Span>{lastMsgUserFirstName}</Span>{lastMsgContent}</SectionListingDescription>
					</SectionListingContent>
					<SectionListingLabel>{lastMsgCreatedAt}</SectionListingLabel>
				</SectionListingBorder>
			</SectionListing>)
	}

	return(
		<>
			<PrivCListHeader />
			<Page>
				<List
					data={privateChats}
			        renderItem={renderedPrivateChat}
			        keyExtractor={item => item.id} 
			    />
				<SectionListingContainer>
					
				</SectionListingContainer>
			</Page>
		</>
	);
}

const PrivCList = ({ navigation }) => {
  
  return(
  	<Container screen={<PrivCListScreen navigation={ navigation }/>} />
  )
}

export default PrivCList
