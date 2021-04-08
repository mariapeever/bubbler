import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'

const ProfileSettingsScreen = () => {
	return(
		<View>
			<Text>Profile settings</Text>
		</View>
	);
}

const ProfileSettings = ({ navigation }) => {
  
  return(
  	<Container screen={<ProfileSettingsScreen navigation={ navigation }/>} />
  )
}

export default ProfileSettings;