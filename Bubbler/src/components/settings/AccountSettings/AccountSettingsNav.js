// import React from 'react';

// import Ionicons from 'react-native-vector-icons/Ionicons' 
// Ionicons.loadFont()

// import { createStackNavigator } from '@react-navigation/stack'

// import AccountSettingsMenu from './AccountSettingsMenu'
// import EditPersonalDetails from './EditPersonalDetails'
// import EditEmail from './EditEmail'
// import EditMobile from './EditMobile'

// const Stack = createStackNavigator()

// const AccountSettingsNav = () => {

// 	return(
// 	 	<Stack.Navigator 
// 	 		initialRouteName="AccountSettingsMenu"
// 	 		>
// 	 		<Stack.Screen 
// 	 			name="AccountSettingsMenu" 
// 	 			component={AccountSettingsMenu} 
// 	 			options={{ title: 'Account' }}
// 	 		/>
// 	  		<Stack.Screen 
// 	  			name="EditPersonalDetails" 
// 	  			component={EditPersonalDetails} 
// 	  			options={{ title: 'Edit personal details' }}
// 	  		/>
// 	    	<Stack.Screen 
// 	    		name="EditEmail" 
// 	    		component={EditEmail} 
// 	    		options={{ title: 'Edit email' }}
// 	    	/>
// 	    	<Stack.Screen 
// 	    		name="EditMobile" 
// 	    		component={EditMobile} 
// 	    		options={{ title: 'Edit mobile' }}
// 	    	/>
// 	  	</Stack.Navigator>
// 	);
// }

// export default AccountSettingsNav