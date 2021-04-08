import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'

const PrivacySettingsScreen = () => {
	return(
		<View>
			<Text>Notification settings</Text>
		</View>
	);
}

const PrivacySettings = ({ navigation }) => {
  
  return(
  	<Container screen={<NotificationSettingsScreen navigation={ navigation }/>} />
  )
}

export default PrivacySettings;