import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'

const HelpScreen = () => {
	return(
		<View>
			<Text>Help</Text>
		</View>
	);
}

const Help = ({ navigation }) => {
  
  return(
  	<Container screen={<HelpScreen navigation={ navigation }/>} />
  )
}

export default Help;