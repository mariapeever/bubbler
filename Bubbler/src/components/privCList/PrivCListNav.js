import React, { useEffect, useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { selectPrivCList_Active } from '../../reducers/privCListSlice'

import {
	selectPrivCParticList_Admin,
	selectPrivCParticList_Active,
	selectPrivCParticList_Pending,
	selectPrivCParticList_Inactive,
	selectPrivCParticList_Flagged,
	selectPrivCParticList_Blocked
} from '../../reducers/privCParticListsSlice'

import { selectParticipantsFromList_Users } from '../../reducers/privCParticipantsSlice'
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
	  	// console.log('on focus')
	  	
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
		// console.log('e',e.id)
		var title = () => {
			let particList = [
				...selectPrivCParticList_Admin(e.participantsList),
				...selectPrivCParticList_Active(e.participantsList),
				...selectPrivCParticList_Pending(e.participantsList),
				...selectPrivCParticList_Inactive(e.participantsList),
				...selectPrivCParticList_Flagged(e.participantsList),
				...selectPrivCParticList_Blocked(e.participantsList)]
			
			let users = selectParticipantsFromList_Users(particList)
			return users[0] ? `${users[0].firstName} ${users[0].lastName}` : ''
		}
		return (
			<Stack.Screen 
	 			name={'PrivateChat-'+e.id} 
	 			component={PrivateChat} 
	 			options={{ 
	 				title: title()
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










