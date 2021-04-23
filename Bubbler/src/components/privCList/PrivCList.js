
import React, { useEffect, useState } from 'react'
import { pure } from 'recompose'

import { useDispatch } from 'react-redux'

import nodejs from 'nodejs-mobile-react-native'

import { extractId } from '../../utils'
import { selectUser, selectUserById } from '../../reducers/usersSlice'
import { 
	selectPrivCList_Active,

} from '../../reducers/privCListSlice'
import { selectPrivateChatsFromList } from '../../reducers/privateChatsSlice'

import { 
	privCMsgListsPushed,
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

	const selectMsgUser = (msgParticipantId) => {
		let msgParticipant = msgParticipantId ? selectPrivCParticipantById(msgParticipantId) : false	
		return msgParticipant ? selectUserById(msgParticipant.user) : false
	}

	const selectPrivateChatsLastMsgProperty = prop => {
		return privCMessages.map(e => e[prop])
	}

	const sortByDate = (array, order=1, prop=false) => {
		
		return array ? array.sort((a, b) => {
			let dateA = new Date(prop ? a[prop] : a).getTime()
			let dateB = new Date(prop ? b[prop] : b).getTime()
			if (dateA < dateB) {
				return order
			}
			if (dateA > dateB) {
				return -order
			}
			return 0
		}) : []
	}

	const user = selectUser()

	const [privateChats, setPrivateChats] = useState(
		selectPrivateChats_Active())

	const [privCMsgLists_OK, setPrivCMsgLists_OK] = useState([].concat.apply([], 
		privateChats.map(e => {
			let list = selectPrivCMsgList_OK(e.messagesList)
			return list.length ? list[list.length - 1] : []
		})
	))

	const [privCMsgLists_Pending, setPrivCMsgLists_Pending] = useState([].concat.apply([], 
		privateChats.map(e => {
			let list = selectPrivCMsgList_Pending(e.messagesList)
			return list.length ? list[list.length - 1] : []
		})
	))

	const [privCMessages_OK, setPrivCMessages_OK] = useState(
		selectPrivCMessagesFromList(privCMsgLists_OK))

	const [privCMessages_Pending, setPrivCMessages_Pending] = useState(
		selectPrivCMessagesFromList(privCMsgLists_Pending))

	const [privCMessages, setPrivCMessages] = useState(privCMessages_OK.map((e, i) => 
		sortByDate([e, privCMessages_Pending[i]], 1, 'createdAt')[0]))
		
	const [pushing, setPushing] = useState('idle')
	
	const [privCIndex, setPrivCIndex] = useState(0)

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
		let mounted = true
		nodejs.start('SSHClient.js');
	    nodejs.channel.addListener(
	      'message',
	      (msg) => {
	      	// console.log('PrivCList :: Listening for messages...')
	      	if (msg.indexOf('ObjectId') != -1 && mounted) {
	      		// console.log('SSH Push :: New message received')
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
			var interval = setInterval(() => {
		 	
		  		// console.log('SSH Push :: Checking for messages...')

		  		let updated = sortByDate(updatedAt, 1)[0]

				nodejs.channel.send({
					filter: user.privateChats, 
					updatedAt: updated,
					query: 'privcmsglists_find'
				})
			}, 500)

			return () => clearInterval(interval);
		}
		
	}, [])

	const loadPrivCMessages = async privCMsgList  => {
		// console.log('PrivCList :: Loading messages...')
	    const fetchedPrivCMessages = privCMsgList.length ? 
	      await dispatch(fetchPrivCMessagesFromList(privCMsgList))
	              .then(unwrapResult) : false

	    const loadedPrivCMessages = fetchedPrivCMessages ? await dispatch(privCMessagesFetchedFromList(fetchedPrivCMessages)) : false

	    if (loadedPrivCMessages) return true
	    return false
	}

	const pushMessages = async (msg) => {
		
		// console.log('PrivCList :: Pushing messages...')
		if (pushing === 'pending') {

			try {
				// console.log('PrivCList :: Pushing messages...')
				let privCMsgListPayload = await dispatch(privCMsgListsPushed(msg))
				
				let list = privCMsgListPayload.payload
				let length = Object.keys(list).length
				Object.entries(list).forEach(async ([key, value]) => {
					let privCMsgListId = key 

					let reSelectedPrivCMsgList_OK = privCMsgListId ? 
						selectPrivCMsgList_OK(privCMsgListId) : false

			  		setPrivCMsgLists_OK(privCMsgLists_OK.map((e, i) => i === privCMsgListId ? 
			  			reSelectedPrivCMsgList_OK.length ? 
			  				reSelectedPrivCMsgList_OK[reSelectedPrivCMsgList_OK.length - 1] : '' : e))

			  		let reSelectedPrivCMsgList_Pending = privCMsgListId ? 
			  			selectPrivCMsgList_Pending(privCMsgListId) : false

			  		setPrivCMsgLists_Pending(privCMsgLists_Pending.map((e, i) => 
				  		i === privCMsgListId ? 
				  			reSelectedPrivCMsgList_Pending.length ? 
				  				reSelectedPrivCMsgList_Pending[reSelectedPrivCMsgList_Pending.length - 1] : '' : e))
				  		
			  		let mergedPrivCMsgList = [
			  			reSelectedPrivCMsgList_OK.length, 
			  			reSelectedPrivCMsgList_Pending.length].some(Boolean) ?
			  			[...reSelectedPrivCMsgList_OK, 
			  			 ...reSelectedPrivCMsgList_OK] : false

			  		let reLoadedMessages = mergedPrivCMsgList ? 
			  			await loadPrivCMessages(mergedPrivCMsgList) : false
			  		
			  		let reSelectedPrivCMsgList_OK_LastMsg = reLoadedMessages ? 
			  			selectLastMessageFromList(reSelectedPrivCMsgList_OK) : false


			  		let reSelectedPrivCMsgList_Pending_LastMsg = reLoadedMessages ? 
			  			selectLastMessageFromList(reSelectedPrivCMsgList_Pending) : false
			  		
			  		let reSelectedPrivCMessage_OK = reSelectedPrivCMsgList_OK_LastMsg ? 
			  			[reSelectedPrivCMsgList_OK_LastMsg] : []

			  		let reSelectedPrivCMessage_Pending = reSelectedPrivCMsgList_Pending_LastMsg ? 
			  			[reSelectedPrivCMsgList_Pending_LastMsg] : []

			  		let lastPrivCMessage = [
			  			reSelectedPrivCMessage_OK, 
			  			reSelectedPrivCMessage_Pending].some(Boolean) ?
			  			sortByDate([].concat.apply([], reSelectedPrivCMessage_OK, 
			  			reSelectedPrivCMessage_Pending), 1, 'createdAt')[0] : false

			  		let privCMsgIndex = privateChats.map(e => e.messagesList).indexOf(privCMsgListId) 

			  		setPrivCMessages_OK(privCMessages_OK.map((e, i) => i === privCMsgIndex ? reSelectedPrivCMsgList_OK_LastMsg : e))
			  		setPrivCMessages_Pending(privCMessages_Pending.map((e, i) => i === privCMsgIndex ? reSelectedPrivCMsgList_Pending_LastMsg : e))
			  		setPrivCMessages(privCMessages.map((e, i) => i === privCMsgIndex ? lastPrivCMessage : e))

					setUpdatedAt(updatedAt.map((e, i) => i === privCMsgIndex ? 
						selectPrivCMsgListById_UpdatedAt(privCMsgListId) : e))

					setLastMsgsContent(lastMsgsContent.map((e, i) => i === privCMsgIndex ?
						lastPrivCMessage['content'] : e))

					setLastMsgsCreatedAt(lastMsgsCreatedAt.map((e, i) => i === privCMsgIndex ?
						dateToTimeDateLabel(lastPrivCMessage['createdAt']) : e))

					setLastMsgsUserFirstName(lastMsgsUserFirstName.map((e, i) => {
						if (i === privCMsgIndex) {
							var lastMsgParticipant = lastPrivCMessage['participant'] 
							return selectMsgUser(lastMsgParticipant).firstName
						}
						return e
					}))	
				})
			  	setPushing('success')
			} catch (err) {
				setPushing('fail')
				console.log('PrivCList :: Pushing messages: ', err)
			} finally {
				setPushing('idle')
				// console.log('PrivCList :: Pushing messages complete')
			}
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
