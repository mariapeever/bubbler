import React, { useEffect, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { createStackNavigator } from '@react-navigation/stack'


import { selectPrivCList_Active } from '../../reducers/privCListSlice'
import { selectNextObjectID, selectPrivateChatsFromList } from '../../reducers/privateChatsSlice'

import PrivCList from './PrivCList'
import { PrivateChat } from '../privateChat'

const Stack = createStackNavigator()


const PrivCListNav = (props) => {
	

	const [nextObjectID, setNextObjectID] = useState(selectNextObjectID())
	const [privateChats, setPrivateChats] = useState(() => {
		const privCList_Active = selectPrivCList_Active()
		return privCList_Active.length  ? 
			selectPrivateChatsFromList(privCList_Active) : []
	})

	useEffect(() => {
	  // Subscribe for the focus Listener
	  const unsubscribe = props.navigation.addListener('focus', async () => {
	  	
	  	setNextObjectID(selectNextObjectID())

	  	setPrivateChats(() => {
			const privCList_Active = selectPrivCList_Active()
			return privCList_Active.length  ? 
				selectPrivateChatsFromList(privCList_Active) : []
		})
	  })
	  return unsubscribe
	}, [props.navigation])

	const renderedPrivateChatsNav = privateChats.map(e => {
		return (
			<Stack.Screen 
	 			name={'PrivateChat-'+e.id} 
	 			component={PrivateChat} 
	 			options={{ 
	 				title: e.title
	 			}}
	 			key={e.id}
	 		/>)
	})

	return(
	 	<Stack.Navigator 
	 		initialRouteName='PrivCList' 
	 		screenOptions={{
				headerStatusBarHeight: 39,
	    		headerStyle: { height: 91 },
	    		headerTransparent: true
			}}>
			<Stack.Screen 
	 			name='PrivCList'
	 			component={PrivCList} 
	 			options={{ 
	 				title: 'Chats'
	 			}}
	 			key='PrivCList'
	 		/>
	 		<Stack.Screen 
	 			name={'PrivateChat-'+nextObjectID} 
	 			component={PrivateChat} 
	 			options={{ 
	 				title: ''
	 			}}
	 			key={nextObjectID}
	 		/>
	 		{renderedPrivateChatsNav}
	  	</Stack.Navigator>
	);
}

export default PrivCListNav
