import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text } from 'react-native';

import { Container } from '../common'

import { AccountSettings } from './AccountSettings'
import { ChatSettings } from './ChatSettings'
import { ProfileSettings } from './ProfileSettings'
import { PrivacySettings } from './PrivacySettings'
import { NotificationSettings } from './NotificationSettings'
import { Help } from './Help'
import { Invite } from './Invite'

import { 
	Page,
	SectionButton,
	Icon,
	IconButtonTitle
} from '../../styled'

import SettingsMenuHeader from './SettingsMenuHeader'

const SettingsMenuScreen = ({ navigation }) => {

	return(
		
		<Page>
			<SettingsMenuHeader />
			<SectionButton onPress={() => navigation.navigate('AccountSettings')}>
				<Icon name="person-circle-outline" />  
				<IconButtonTitle>Account</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('ChatSettings')}>
				<Icon name="chatbubble-ellipses-outline" />  
				<IconButtonTitle>Chat</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('ProfileSettings')}>
				<Icon name="person-outline" />  
				<IconButtonTitle>Profile</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('PrivacySettings')}>
				<Icon name="lock-closed-outline" />  
				<IconButtonTitle>Privacy</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('NotificationSettings')}>
				<Icon name="notifications-outline" />  
				<IconButtonTitle>Notifications</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('Invite')}>
				<Icon name="arrow-redo-outline" />  
				<IconButtonTitle>Invite a friend</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('Help')}>
				<Icon name="information-circle-outline" />  
				<IconButtonTitle>Help</IconButtonTitle>
			</SectionButton>
		</Page>
	);
}

const SettingsMenu = ({ navigation }) => {
  
  return(
  	<Container screen={<SettingsMenuScreen navigation={ navigation }/>} />
  )
}

export default SettingsMenu;