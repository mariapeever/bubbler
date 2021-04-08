
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { fetchUser, userFetched, selectUserId, selectUser } from '../../../reducers/userSlice'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { createStackNavigator } from '@react-navigation/stack'
import { CommonActions } from '@react-navigation/native'
import { unwrapResult } from '@reduxjs/toolkit'

import { View, TouchableOpacity, Text, Button } from 'react-native'

import { Container } from '../../common'

import { EditPersonalDetails } from './EditPersonalDetails'
import { EditEmail } from './EditEmail'
import { EditMobile } from './EditMobile'

import { 
	Page,
	SectionButton,
	Icon,
	SectionButtonTitle,
	SectionTitle
} from '../../../styled'


import AccountSettingsMenuHeader from './AccountSettingsMenuHeader'

const AccountSettingsMenuScreen = ({ navigation }) => {

	const userId = selectUserId()

	const [id, setId] = useState(userId)

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')

	const dispatch = useDispatch()

	useEffect(() => {
	  // Subscribe for the focus Listener
	  navigation.addListener('focus', async () => {
	  	const user = selectUser()
			setFirstName(user.firstName)
			setLastName(user.lastName)
			setEmail(user.email)
	  })

	}, [navigation])

	return(
		<Page>
			<SectionTitle>Personal Details</SectionTitle>
			<SectionButton onPress={() => navigation.push('EditPersonalDetails')}>
				<SectionButtonTitle>{firstName} {lastName}</SectionButtonTitle>
			</SectionButton>
			<SectionTitle>Email</SectionTitle>
			<SectionButton onPress={() => navigation.push('EditEmail')}>
				<SectionButtonTitle>{email}</SectionButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.push('EditEmail')}>
				<SectionButtonTitle>Chat</SectionButtonTitle>
			</SectionButton>
			<SectionTitle>Mobile</SectionTitle>
			<SectionButton onPress={() => navigation.navigate('EditMobile')}>
				<SectionButtonTitle>Profile</SectionButtonTitle>
			</SectionButton>
		</Page>

	);
}

const AccountSettingsMenu = ({ navigation }) => {
  
  return(
  	<Container screen={<AccountSettingsMenuScreen navigation={ navigation }/>} />
  )
}

export default AccountSettingsMenu;