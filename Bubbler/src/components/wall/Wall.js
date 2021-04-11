import React from 'react'

import { createStackNavigator, StackActions, NavigationActions } from '@react-navigation/stack';

import { FlatList, Button } from 'react-native'

import { Container } from '../common'

import WallHeader from './WallHeader'

const WallScreen = ({ navigation }) => {

  return(
    <>
  		<WallHeader />
  		<Button
	        title="Search"
	        onPress={() => navigation.navigate('Search')}
	    />
    </>
  )
}

const Wall = ({ navigation }) => {
  
  return(
  	<Container screen={<WallScreen navigation={ navigation }/>} />
  )
}

export default Wall