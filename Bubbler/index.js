/**
 * @format
 */

import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'

import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import styled from 'styled-components/native'

import Theme from './src/styled/Theme'

import App  from './App'
import store from './src/store'

interface Props {}
const Entry = ({}: Props) => {
	
	return(
		<NavigationContainer>
			
			<Provider store={store}>
				<ThemeProvider theme={Theme} >
					<App />
				</ThemeProvider>
    		</Provider>
		</NavigationContainer>
  )
}

AppRegistry.registerComponent(appName, () => Entry)
