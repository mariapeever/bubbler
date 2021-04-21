import React from 'react';
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'
import { Page } from '../../../styled'

import SettingsHeader from '../SettingsHeader'

const NotificationSettingsScreen = () => {
	return(
		<>
			<SettingsHeader />
			<Page>
				<Text>Notification settings</Text>
			</Page>
		</>
	);
}

const NotificationSettings = ({ navigation }) => {
  
  return(
  	<Container screen={<NotificationSettingsScreen navigation={ navigation }/>} />
  )
}

export default NotificationSettings
