
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import nodejs from 'nodejs-mobile-react-native'

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

	const selectPrivateChatsLastMsgProperty = prop => {

		return privateChats.map(e => {
			let lastMsg = selectLastMsg(e.messagesList)
			return lastMsg ? lastMsg[prop] : false
		})
	}

	const [privateChats, setPrivateChats] = useState(
		selectPrivateChats_Active())

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

	// const [updatedAt, setUpdatedAt] = useState(() => 
	// 	selectPrivCMsgListById_UpdatedAt(messagesListId))

	// const [privCMsgList_OK, setPrivCMsgList_OK] = useState(
	// 	selectPrivCMsgList_OK(messagesListId))
	// const [privCMsgList_Pending, setPrivCMsgList_Pending] = useState(
	// 	selectPrivCMsgList_Pending(messagesListId))

	// const [privCMessages_OK, setPrivCMessages_OK] = useState(() => {
	// 	return privCMsgList_OK.length ? 
	// 		selectPrivCMessagesFromList(privCMsgList_OK) : []
	// })

	// const [privCMessages_Pending, setPrivCMessages_Pending] = useState(() => {
	// 	return privCMsgList_Pending.length ? 
	// 		selectPrivCMessagesFromList(privCMsgList_Pending) : []
	// })

	// const [privCMessages, setPrivCMessages] = useState(sortMessages(privCMessages_OK, privCMessages_Pending))


	

	// useEffect(() => {

	// 	const unsubscribe = () => {
	// 		nodejs.start('PrivcMsgListsClient.js');
	// 	    nodejs.channel.addListener(
	// 	      'message',
	// 	      async (msg) => {
	// 	      	if (msg.indexOf('ObjectId') != -1) {
	// 	      		console.log('SSH Push :: New message received.')
	// 	      		pushMessages(msg) 
	// 	      	} 
	// 	      },
	// 	      this
	// 	    )
	// 	}
	// 	return unsubscribe
	// })

	// useEffect(() => {

	//     const interval = setInterval(() => {
	//   		console.log('SSH Push :: Listening for messages.')
	 
	// 		const updatedAt = selectPrivCMsgListById_UpdatedAt(privateChat.messagesList)
	// 		nodejs.channel.send({
	// 			id: messagesListId, 
	// 			updatedAt: updatedAt
	// 		})
	//     }, 300)
	//     return () => clearInterval(interval);
	    
	// }, [])

	// const loadPrivCMessages = async privCMsgList  => {

	//     const fetchedPrivCMessages = privCMsgList.length ? 
	//       await dispatch(fetchPrivCMessagesFromList(privCMsgList))
	//               .then(unwrapResult) : false
	//     if (fetchedPrivCMessages) {
	//     	dispatch(privCMessagesFetchedFromList(fetchedPrivCMessages))
	//       return true
	//     }
	//     return false
	// }

	// const pushMessages = async (msgs) => {
	// 	let list = await dispatch(privCMsgListPushed(msgs))
 //  		let reSelectedPrivCMsgList_OK = list ? selectPrivCMsgList_OK(messagesListId) : false
 //  		let reSelectedPrivCMsgList_Pending = list ? selectPrivCMsgList_Pending(messagesListId) : false

 //  		let mergedPrivCMsgList = [
 //  			reSelectedPrivCMsgList_OK, 
 //  			reSelectedPrivCMsgList_Pending].every(Boolean) ?
 //  			[...reSelectedPrivCMsgList_OK,
 //  			 ...reSelectedPrivCMsgList_Pending] : false

 //  		let reLoadedPrivMessages = mergedPrivCMsgList ? 
 //  			await loadPrivCMessages(mergedPrivCMsgList) : false
  		
 //  		let reSelectedPrivCMessages_OK = reLoadedPrivMessages ? 
 //  			selectPrivCMessagesFromList(reSelectedPrivCMsgList_OK) : false

 //  		let reSelectedPrivCMessages_Pending = reLoadedPrivMessages ? 
 //  			selectPrivCMessagesFromList(reSelectedPrivCMsgList_Pending) : false

 //  		console.log('reSelectedPrivCMessages_OK',reSelectedPrivCMessages_OK)
 //  		let sortedPrivCMessages = [
 //  			reSelectedPrivCMessages_OK, 
 //  			reSelectedPrivCMessages_Pending].every(Boolean) ? 
 //  			sortMessages(reSelectedPrivCMessages_OK, reSelectedPrivCMessages_Pending) : false
  		
 //  		if (sortedPrivCMessages) setPrivCMessages(sortedPrivCMessages) 
	// } 

	
	useEffect(() => {
	  // Subscribe for the focus Listener
	  const unsubscribe = navigation.addListener('focus', async () => {
	  	setPrivateChats(selectPrivateChats_Active())
		setLastMsgsContent(selectPrivateChatsLastMsgProperty('content'))
		setLastMsgsCreatedAt(
			selectPrivateChatsLastMsgProperty('createdAt').map(e => {
				return e ? dateToTimeDateLabel(e) : false
			}))
		setLastMsgsUserFirstName(() => {
			var lastMsgParticipants = selectPrivateChatsLastMsgProperty('participant')
			return lastMsgParticipants.map(e => selectMsgUser(e).firstName)
		})
	  })
	  return unsubscribe
	}, [navigation])


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