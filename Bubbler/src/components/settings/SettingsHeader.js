import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { PageHeader } from '../../styled'

import { Header } from '../common';

const ScreenHeader = () => {
  return (
  	<PageHeader />
  )
}

const SettingsHeader = () => {
	return(
	 	<Header screenHeader={<ScreenHeader/>} statusBar={{}} />
	);
}

export default SettingsHeader;