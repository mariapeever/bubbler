import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { LightText, PageHeader } from '../../../styled'

import { Header } from '../../common';

const ScreenHeader = () => {
  return (
  	<PageHeader></PageHeader>
  )
}

const LoginHeader = () => {
	return(
	 	<Header screenHeader={<ScreenHeader/>} statusBar={{}} />
	);
}

export default LoginHeader;