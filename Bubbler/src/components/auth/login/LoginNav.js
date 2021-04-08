import React from 'react';

import { createStackNavigator, StackActions } from '@react-navigation/stack'

import Login from './Login'

import { SignUp } from '../signUp'
import { Reset } from '../reset'
import { Nav } from '../../nav'

const Stack = createStackNavigator();

const LoginNav = () => {
	return(
	 	<Stack.Navigator 
	 		initialRouteName="Login"
	 		screenOptions={{
				headerStatusBarHeight: 39,
	    		headerStyle: { height: 91 }
			}} >
	 		<Stack.Screen 
	 			name="Login" 
	 			component={Login} 
	 			options={{ title: 'Login', header: ()=> null }}
	 		/>
	  		<Stack.Screen 
	  			name="SignUp" 
	  			component={SignUp} 
	  			options={{ title: 'Sign Up' }}
	  		/>
	    	<Stack.Screen 
	    		name="Reset" 
	    		component={Reset} 
	    		options={{ title: 'Reset Password' }}
	    	/>
	    	<Stack.Screen 
	    		name="Nav" 
	    		component={Nav}
	    		options={{ header: ()=> null }}
	    	/>
	  	</Stack.Navigator>
	);
}

export default LoginNav;