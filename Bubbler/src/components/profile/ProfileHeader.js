import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()
import { PageHeader } from '../../styled'

import { Header } from '../common';

const ScreenHeader = ({navigation}) => {
  return (
  	<PageHeader />
  )
}

const WallHeader = () => {
	return(
	 	<Header screenHeader={<ScreenHeader/>} statusBar={{}} />
	);
}

export default WallHeader;