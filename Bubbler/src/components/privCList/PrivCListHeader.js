import React, { useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import Theme from '../../styled/Theme'

import { 
	View, 
	Text, 
	Button, 
	StyleSheet } from 'react-native';

import { 
	PageHeader, 
	IconButton,
	Toolbar,
	Input,
	ButtonDefault,
	ButtonTitle,
	ModalInput,
	Inner,
	ButtonClear,
	ButtonClearTitle,
	Page,
	Icon,
	SectionListing,
	Avatar,
	SectionListingBorder,
	SectionListingContent,
	SectionListingTitle,
	SectionListingDescription,
	List } from '../../styled'

import { Header, Modal } from '../common'

import NewPrivateChat from './NewPrivateChat'

function ScreenHeader({ navigation }) {

	const [modalVisible, setModalVisible] = useState(false)

  	return (
	  	<PageHeader>
	  		<Avatar
				source={require('../../assets/images/avatar.png')}
				size='sm'
			/>
			<Modal title='New chat' 
				screen={<NewPrivateChat 
					navigation={navigation} 
					modal={[modalVisible, setModalVisible]}/>} 
				modal={[modalVisible, setModalVisible]}/>
		</PageHeader>
  	)
}

const PrivCListHeader = ({ navigation }) => {
	return(
	 	<Header screenHeader={<ScreenHeader navigation={navigation} />} statusBar={{}} />
	);
}

export default PrivCListHeader



































