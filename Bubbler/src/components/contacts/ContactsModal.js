import React, { useState } from 'react';
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { useDispatch } from 'react-redux'

import {
	fetchUsersByRegex,
	usersFetchedFromList,
	selectUsersFromList
} from '../../reducers/usersSlice';

import {
	createPrivateChat
} from '../../reducers/privateChatsSlice'

import { 
	View, 
	Text,
	Modal } from 'react-native'

import { 
	PageHeader, 
	IconButton,
	Toolbar,
	ModalContainer,
	ModalHeader,
	ModalBody,
	ModalTitle,
	Input,
	ButtonDefault,
	ButtonTitle,
	ModalInput,
	Inner,
	ButtonClear,
	ButtonClearTitle,
	Page,
	Icon,
	IconButtonRight,
	SectionListing,
	Avatar,
	SectionListingBorder,
	SectionListingContent,
	SectionListingTitle,
	SectionListingDescription,
	List } from '../../styled'

import { unwrapResult } from '@reduxjs/toolkit'

import { Header } from '../common'



import Theme from '../../styled/Theme'

const ContactsModal = () => {

	const [modalVisible, setModalVisible] = useState(false);

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [regex, setRegex] = useState('')
	const [users, setUsers] = useState([])
	const [participants, setParticipants] = useState([])

	const [addRequestStatus, setAddRequestStatus] = useState('idle')

	const dispatch = useDispatch()

	const onTitleChanged = e => setTitle(e)
	const onDescriptionChanged = e => setDescription(e)
	const onParticipantsChanged = e => loadUsers(e)

	const loadUsers = async (regex) => {
		console.log(regex)
		var fetchedUsers = await dispatch(fetchUsersByRegex(regex))
			.then(unwrapResult)

		var loadedUsers = fetchedUsers ? usersFetchedFromList(fetchedUsers) : false
		var results = loadedUsers ? fetchedUsers.map(e => e._id) : false
		var selectedUsers = results ? selectUsersFromList(results) : false

		if (loadedUsers) setUsers(selectedUsers)
	}

	const onAddChatClicked = async () => {
  		
	  	if (canAddChat) {
	      try {
	        setAddRequestStatus('pending')
	        console.log('PrivateChat :: Sending a message')
	        const resultAction = await dispatch(
	          createPrivateChat({
	            title: title,
	            description: description,
	            participants: participants,
	          })
	        ).then(unwrapResult)

	        setAddRequestStatus('success')
	        
	        dispatch(
	          privChatAdded(resultAction)
	        )        
	        setMsgContent('')

	      } catch (err) {
	        setAddRequestStatus('failed')
	        console.error('Update user failed: ', err)
	      }  finally {
	      	console.log('PrivateChat :: Message sent')
	        setAddRequestStatus('idle')
	      }
	  	}
  	}

  	const renderedUser = ({ item }) => {

  		let image = `${item.image}`
		let name = `${item.firstName} ${item.lastName}`
		let status = `${item.satus}`

		return(

			<SectionListing onPress={onSelectUser} key={item.id}>
				<Avatar
					source={require('../../assets/images/avatar.png')}
				/>
				<SectionListingBorder>
					<SectionListingContent>
						<SectionListingTitle>{name}</SectionListingTitle>
						<SectionListingDescription>{status}</SectionListingDescription>
					</SectionListingContent>
				</SectionListingBorder>
			</SectionListing>)
	}

	<PageHeader>
			<ContactsModal />
			<IconButton.Button
				backgroundColor="transparent"
				color={Theme.background.mainHighlight}
				name='send'
			/>
			<IconButton.Button
				backgroundColor="transparent"
				color={Theme.color.mainHighlight}
				name='create-outline'
				onPress={() => setModalVisible(true)}
				size={26}
			/>

		</PageHeader>
	return (
		<>	
			<Modal
		        animationType="slide"
		        transparent={true}
		        visible={modalVisible}
		        onRequestClose={() => {
		          Alert.alert("Modal has been closed.");
		          setModalVisible(!modalVisible);
		        }}
		    >

		        <ModalContainer>
		        	<Page>
			        	<ModalHeader>
							<ModalTitle>Add a chat</ModalTitle>
							<ButtonClear onPress={onAddChatClicked}>
			  					
			  						<IconButtonRight.Button
										backgroundColor="transparent"
										color={Theme.color.mainHighlight}
										name='chevron-forward-outline'
										onPress={() => setModalVisible(!modalVisible)}
										size={24}
									><ButtonClearTitle>Next</ButtonClearTitle></IconButtonRight.Button>
			  					

			  				</ButtonClear>
							<IconButton.Button
								backgroundColor="transparent"
								color={Theme.color.mainHighlight}
								name='close'
								onPress={() => setModalVisible(!modalVisible)}
								size={24}
							/>
						</ModalHeader>

						<ModalBody>
							<Input
			  					id='name'
			  					name='title'
			  					value={title}
			  					placeholder='Title'
			  					textContentType='none'
			  					onChangeText={onTitleChanged}
			  				/>
			  				<Input
			  					id='description'
			  					name='description'
			  					value={description}
			  					placeholder='Description'
			  					textContentType='none'
			  					onChangeText={onDescriptionChanged}
			  				/>
			  				<Input
			  					id='participants'
			  					name='participants'
			  					value={participants}
			  					placeholder='Participants'
			  					textContentType='none'
			  					onChangeText={onParticipantsChanged}
			  				/>
			  				<List
								data={users}
						        renderItem={renderedUser}
						        keyExtractor={item => item.id} 
						    />
			  		
						</ModalBody>
					</Page>
		        </ModalContainer>
		    </Modal>
			<PageHeader>
				
				<IconButton.Button
					backgroundColor="transparent"
					color={Theme.background.mainHighlight}
					name='send'
					onPress={onAddChatClicked}

				/>
				<IconButton.Button
					backgroundColor="transparent"
					color={Theme.color.mainHighlight}
					name='create-outline'
					onPress={() => setModalVisible(true)}
					size={26}
				/>

			</PageHeader>
		</>
	)
}


export default ContactsModal
