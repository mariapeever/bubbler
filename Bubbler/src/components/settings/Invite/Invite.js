import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'
import { Page } from '../../../styled'

import SettingsHeader from '../SettingsHeader'

const InviteScreen = () => {
	return(
		<>
			<SettingsHeader />
			<Page>
				<Text>Invite</Text>
			</Page>
		</>
	);
}

const Invite = ({ navigation }) => {
  
  return(
  	<Container screen={<InviteScreen navigation={ navigation }/>} />
  )
}

export default Invite;