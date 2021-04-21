import React from 'react';
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { createStackNavigator } from '@react-navigation/stack'

import SettingsMenu from './SettingsMenu'

import { ChatSettings } from './chatSettings'
import { NotificationSettings } from './notificationSettings'
import { PrivacySettings } from './privacySettings'
import { ProfileSettings } from './profileSettings'
import { Invite } from './invite'
import { Help } from './help'

import { 
	AccountSettings,
	EditPersonalDetails,
	EditEmail,
	EditMobile } from './accountSettings'

const Stack = createStackNavigator()

const SettingsNav = () => {
	return(
	 	<Stack.Navigator 
	 		initialRouteName="SettingsMenu" 
	 		screenOptions={{
				headerStatusBarHeight: 39,
	    		headerStyle: { height: 91 },
	    		headerTransparent: true
			}}>
	 		<Stack.Screen 
	 			name="SettingsMenu" 
	 			component={SettingsMenu} 
	 			options={{ title: 'Settings' }}
	 		/>
	  		<Stack.Screen 
	  			name="AccountSettings" 
	  			component={AccountSettings} 
	  			options={{ title: 'Account Settings' }}
	  		/>
		  		<Stack.Screen 
		  			name="EditPersonalDetails" 
		  			component={EditPersonalDetails} 
		  			options={{ title: 'Edit personal details' }}
		  		/>
		    	<Stack.Screen 
		    		name="EditEmail" 
		    		component={EditEmail} 
		    		options={{ title: 'Edit email' }}
		    	/>
		    	<Stack.Screen 
		    		name="EditMobile" 
		    		component={EditMobile} 
		    		options={{ title: 'Edit mobile' }}
		    	/>
		    <Stack.Screen 
	  			name="ChatSettings" 
	  			component={ChatSettings} 
	  			options={{ title: 'Chat Settings' }}
	  		/>
	  		 <Stack.Screen 
	  			name="PrivacySettings" 
	  			component={PrivacySettings} 
	  			options={{ title: 'Privacy Settings' }}
	  		/>
	  		<Stack.Screen 
	  			name="ProfileSettings" 
	  			component={ProfileSettings} 
	  			options={{ title: 'Profile Settings' }}
	  		/>
	  		<Stack.Screen 
	  			name="NotificationSettings" 
	  			component={NotificationSettings} 
	  			options={{ title: 'Notification Settings' }}
	  		/>
	  		<Stack.Screen 
	  			name="Invite" 
	  			component={Invite} 
	  			options={{ title: 'Invite' }}
	  		/>
	  		<Stack.Screen 
	  			name="Help" 
	  			component={Help} 
	  			options={{ title: 'Help' }}
	  		/>
		  		
	  	</Stack.Navigator>
	);
}
export default SettingsNav
