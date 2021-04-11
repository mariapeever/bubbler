import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'
import { Page } from '../../../styled'

import SettingsHeader from '../SettingsHeader'
const ProfileSettingsScreen = () => {
	return(
		<>	
			<SettingsHeader />
			<Page>
				<Text>Profile settings</Text>
			</Page>
		</>
	);
}

const ProfileSettings = ({ navigation }) => {
  
  return(
  	<Container screen={<ProfileSettingsScreen navigation={ navigation }/>} />
  )
}

export default ProfileSettings;