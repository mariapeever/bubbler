import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'


const ChatSettingsScreen = () => {
	return(
		<View>
			<Text>Chat Settings</Text>
		</View>
	);
}

const ChatSettings = ({ navigation }) => {
  
  return(
  	<Container screen={<ChatSettingsScreen navigation={ navigation }/>} />
  )
}

export default ChatSettings;