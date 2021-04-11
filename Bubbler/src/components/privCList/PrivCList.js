
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { fetchUser, anotherUserFetched, selectAnotherUserById } from '../../reducers/userSlice'
import { selectActivePrivCList } from '../../reducers/privCListSlice'
import { selectPrivateChatsFromList } from '../../reducers/privateChatsSlice'
import { selectLastMessageFromList } from '../../reducers/privCMessagesSlice'
import { selectPrivCParticipantById } from '../../reducers/privCParticipantsSlice'
import { fetchPrivCMsgList, privCMsgListFetched, selectOKPrivCMsgList } from '../../reducers/privCMsgListsSlice'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { unwrapResult } from '@reduxjs/toolkit'

import { View, FlatList, TouchableOpacity, Text, Button } from 'react-native'

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
	const privCList = selectActivePrivCList()
	const privateChats = selectPrivateChatsFromList(privCList)

	const dispatch = useDispatch()

	const renderedPrivateChat = ({ item }) => {

		const OK_privCMsgs = item.messagesList ? selectOKPrivCMsgList(item.messagesList) : []
		const lastMsg = OK_privCMsgs.length ? selectLastMessageFromList(OK_privCMsgs) : false

		const lastMsgContent = lastMsg ? lastMsg.content : 'No messages yet.'
		const lastMsgCreatedAt = lastMsg ? dateToTimeDateLabel(lastMsg.createdAt) : ''
		
		const lastMsgParticipantId = lastMsg ? lastMsg.participant : false
		
		const lastMsgParticipant = lastMsgParticipantId ? selectPrivCParticipantById(lastMsgParticipantId) : false
		
		const lastMsgUser = lastMsgParticipant ? selectAnotherUserById(lastMsgParticipant.user) : false

		const lastMsgUserFirstName = lastMsgUser ? `${lastMsgUser.firstName}: ` : ''

		// var lastMsgUserImage = lastMsgUser.image ? lastMsgUser.image : require('../../assets/images/avatar.png')

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