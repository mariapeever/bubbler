import React from 'react';
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import { View, Text, Button, StyleSheet } from 'react-native';
import { PageHeader } from '../../styled'
import { Header } from '../common';

function ScreenHeader() {
  return (
  	<PageHeader></PageHeader>
  )
}

const PrivateChatHeader = () => {
	return(
	 	<Header screenHeader={<ScreenHeader/>} statusBar={{}} />
	);
}


export default PrivateChatHeader
