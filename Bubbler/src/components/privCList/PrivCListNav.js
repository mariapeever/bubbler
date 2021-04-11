import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { createStackNavigator } from '@react-navigation/stack'

import { selectActivePrivCList } from '../../reducers/privCListSlice'
import { selectPrivateChatsFromList } from '../../reducers/privateChatsSlice'


import PrivCList from './PrivCList'
import { PrivateChat } from '../privateChat'

const Stack = createStackNavigator()

const SettingsNav = () => {
	const privCList = selectActivePrivCList()
	const privateChats = privCList ? selectPrivateChatsFromList(privCList) : []

	const renderedPrivateChatsNav = privateChats.map(e => {
		return (
			<Stack.Screen 
	 			name={'PrivateChat-'+e.id} 
	 			component={PrivateChat} 
	 			options={{ title: e.title, }}
	 		/>)
	})

	return(
	 	<Stack.Navigator 
	 		initialRouteName="PrivCList" 
	 		screenOptions={{
				headerStatusBarHeight: 39,
	    		headerStyle: { height: 91 },
	    		headerTransparent: true
			}}>
			<Stack.Screen 
	 			name="PrivCList" 
	 			component={PrivCList} 
	 			options={{ 
	 				title: 'Chats'
	 			}}
	 		/>
	 		{renderedPrivateChatsNav}
	  	</Stack.Navigator>
	);
}

export default SettingsNav