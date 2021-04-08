import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'

const InviteScreen = () => {
	return(
		<View>
			<Text>Invite</Text>
		</View>
	);
}

const Invite = ({ navigation }) => {
  
  return(
  	<Container screen={<InviteScreen navigation={ navigation }/>} />
  )
}

export default Invite;