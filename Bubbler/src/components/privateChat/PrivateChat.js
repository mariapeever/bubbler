
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { selectPrivateChatById } from '../../reducers/privateChatsSlice'
import { fetchPrivCMessagesFromList, privCMessagesFetchedFromList, selectPrivCMessagesFromList, createPrivCMessage, privCMessageAdded } from '../../reducers/privCMessagesSlice'
import { fetchPrivCMsgList, privCMsgListFetched, selectOKPrivCMsgList } from '../../reducers/privCMsgListsSlice'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { unwrapResult } from '@reduxjs/toolkit'

import { 
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
	WhiteText
} from '../../styled'

import {useRoute} from '@react-navigation/native';

const PrivateChatScreen = ({ navigation }) => {
	const route = useRoute()
	const params = route.params

	const [id, setId] = useState(params.id)
	const [participant, setParticipant] = useState('')
	const [title, setTitle] = useState('')

	const [privCMessages, setPrivCMessages] = useState([])

	const [msgContent, setMsgContent] = useState('This is a message')
	const [msgType, setMsgType] = useState('text')

	const [addRequestStatus, setAddRequestStatus] = useState('idle')

	const canSend = msgContent && addRequestStatus === 'idle'

	const dispatch = useDispatch()

	const onMsgContentChanged = e => setMsgContent(e)

	React.useEffect(() => {

	  	const unsubscribe = navigation.addListener('focus', async () => {
			const privateChat = selectPrivateChatById(id)

			setParticipant(privateChat.participant)
			setTitle(privateChat.title)

			const OK_privCMsgList = selectOKPrivCMsgList(privateChat.messagesList)

			const OK_privCMsgs = OK_privCMsgList.length ? selectPrivCMessagesFromList(OK_privCMsgList) : false
			if (OK_privCMsgs) {
				setPrivCMessages(OK_privCMsgs)
			}

		})
	    // Return the function to unsubscribe from the event so it gets removed on unmount
	    return unsubscribe
	}, [navigation])

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
        )
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

	const renderedMessage = ({ item }) => {
		return(
	    <MessageBubble>
			<WhiteText>{item.content}</WhiteText>
		</MessageBubble>)
	}
	return(
		<Page>
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
						color={Theme.color.lighterMainHighlight}
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

