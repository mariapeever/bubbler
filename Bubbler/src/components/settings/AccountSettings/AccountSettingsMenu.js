
import React, { useEffect, useState } from 'react'
import { pure } from 'recompose'

import { useDispatch } from 'react-redux'

import { fetchUser, userFetched, selectUser } from '../../../reducers/usersSlice'

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


import SettingsHeader from '../SettingsHeader'

const AccountSettingsMenuScreen = ({ navigation }) => {

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [mobile, setMobile] = useState('')

	const dispatch = useDispatch()

	useEffect(() => {
	  // Subscribe for the focus Listener
	  const unsubscribe = navigation.addListener('focus', async () => {
	  	const user = selectUser()
		setFirstName(user.firstName)
		setLastName(user.lastName)
		setEmail(user.email)
		setMobile(user.mobile)
	  })
	  return unsubscribe
	}, [navigation])

	return(
		<>
			<SettingsHeader />
			<Page>
				<SectionTitle>Personal Details</SectionTitle>
				<SectionButton onPress={() => navigation.push('EditPersonalDetails')}>
					<SectionButtonTitle>{firstName} {lastName}</SectionButtonTitle>
				</SectionButton>
				<SectionTitle>Email</SectionTitle>
				<SectionButton onPress={() => navigation.push('EditEmail')}>
					<SectionButtonTitle>{email}</SectionButtonTitle>
				</SectionButton>
				<SectionTitle>Mobile</SectionTitle>
				<SectionButton onPress={() => navigation.navigate('EditMobile')}>
					<SectionButtonTitle>{mobile}</SectionButtonTitle>
				</SectionButton>
			</Page>
		</>
	);
}

const AccountSettingsMenu = ({ navigation }) => {
  
  return(
  	<Container screen={<AccountSettingsMenuScreen navigation={ navigation }/>} />
  )
}
export default AccountSettingsMenu
