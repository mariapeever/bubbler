import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, TouchableOpacity, Text } from 'react-native';

import { Container } from '../common'

import { AccountSettings } from './accountSettings'
import { ChatSettings } from './chatSettings'
import { ProfileSettings } from './profileSettings'
import { PrivacySettings } from './privacySettings'
import { NotificationSettings } from './notificationSettings'
import { Help } from './help'
import { Invite } from './invite'

import { 
	Page,
	SectionButton,
	WhiteIcon,
	IconButtonTitle,
	IconBase,
	SectionTitle
} from '../../styled'

import SettingsHeader from './SettingsHeader'

const SettingsMenuScreen = ({ navigation }) => {

	return(
		
		<Page>
			<SettingsHeader />
			<SectionTitle>General</SectionTitle>
			<SectionButton onPress={() => navigation.navigate('AccountSettings')} key='AccountSettings'>
				<IconBase color='blue'>
					<WhiteIcon name="person-circle-outline" />   
				</IconBase>
				
				<IconButtonTitle>Account</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('ChatSettings')} key='ChatSettings'>
				<IconBase color='green'>
					<WhiteIcon name="chatbubble-ellipses-outline" /> 
				</IconBase>
				
				<IconButtonTitle>Chat</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('ProfileSettings')} key='ProfileSettings'>
				<IconBase color='purple'>
					<WhiteIcon name="person-outline" />   
				</IconBase>
				
				<IconButtonTitle>Profile</IconButtonTitle>
			</SectionButton>

			<SectionTitle>Privacy</SectionTitle>
			<SectionButton onPress={() => navigation.navigate('PrivacySettings')}>
				<IconBase color='red'>
					<WhiteIcon name="lock-closed-outline" />  
				</IconBase>
				
				<IconButtonTitle>Privacy</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('NotificationSettings')}>
				<IconBase color='orange'>
					<WhiteIcon name="notifications-outline" />  
				</IconBase>
				<IconButtonTitle>Notifications</IconButtonTitle>
			</SectionButton>

			<SectionTitle>About</SectionTitle>
			<SectionButton onPress={() => navigation.navigate('Invite')}>
				<IconBase color='violet'>
					<WhiteIcon name="arrow-redo-outline" />  
				</IconBase>
				<IconButtonTitle>Invite a friend</IconButtonTitle>
			</SectionButton>
			<SectionButton onPress={() => navigation.navigate('Help')}>
				<IconBase color='lightBlue'>
					<WhiteIcon name="information-circle-outline" />  
				</IconBase>
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