import React from 'react';
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'
import { Page } from '../../../styled'

import SettingsHeader from '../SettingsHeader'

const ChatSettingsScreen = () => {
	return(
		<>	
			<SettingsHeader />
			<Page>
				<Text>Chat Settings</Text>
			</Page>
		</>
	);
}

const ChatSettings = ({ navigation }) => {
  
  return(
  	<Container screen={<ChatSettingsScreen navigation={ navigation }/>} />
  )
}

export default ChatSettings
