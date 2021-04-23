import React, { useState } from 'react';
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { ContactsModal } from '../contacts'

import { 
	View, 
	Text,
	Modal } from 'react-native';
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
	IconButtonRight } from '../../styled'
import { Header } from '../common';

import Theme from '../../styled/Theme'

function ScreenHeader() {
	return (
		<ContactsModal />
	)
}

const PrivCListHeader = () => {
	return(
	 	<Header screenHeader={<ScreenHeader/>} statusBar={{}} />
	);
}

export default PrivCListHeader
