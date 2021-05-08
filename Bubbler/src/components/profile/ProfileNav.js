import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { createStackNavigator } from '@react-navigation/stack';

import { Search } from '../search' 

import Profile from './Profile' 

const Stack = createStackNavigator();

const ProfileNav = () => {

	return(
	 	<Stack.Navigator 
	 		initialRouteName="Profile"
	 		screenOptions={{
				headerStatusBarHeight: 39,
	    		headerStyle: { height: 91 },
	    		headerTransparent: true
			}} >
	 		<Stack.Screen 
	    		name="Profile" 
	    		component={Profile} 
	    		options={{ title: 'Profile', headerMode: 'none', headerShown : false}}
			/>

	  	</Stack.Navigator>
	);
}

export default ProfileNav;