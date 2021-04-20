import React, { useEffect, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { createStackNavigator } from '@react-navigation/stack'

import { selectPrivCList_Active } from '../../reducers/privCListSlice'
import { selectPrivateChatsFromList } from '../../reducers/privateChatsSlice'


import PrivCList from './PrivCList'
import { PrivateChat } from '../privateChat'

const Stack = createStackNavigator()

const SettingsNav = () => {

	const [privateChats, setPrivateChats] = useState(() => {
		const privCList_Active = selectPrivCList_Active()
		return privCList_Active.length  ? 
			selectPrivateChatsFromList(privCList_Active) : []
	})

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