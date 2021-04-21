import React from 'react';
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text } from 'react-native';

import { Container } from '../../common'
import { Page } from '../../../styled'

import SettingsHeader from '../SettingsHeader'

const HelpScreen = () => {
	return(
		<>
			<SettingsHeader />
			<Page>
				<Text>Help</Text>
			</Page>
		</>
	);
}

const Help = ({ navigation }) => {
  
  return(
  	<Container screen={<HelpScreen navigation={ navigation }/>} />
  )
}

export default Help
