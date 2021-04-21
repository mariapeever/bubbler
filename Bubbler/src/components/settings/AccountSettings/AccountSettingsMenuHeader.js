import React from 'react';
import { pure } from 'recompose'
import { createStackNavigator } from '@react-navigation/stack';

import { PageHeader } from '../../../styled'

import { Header } from '../../common';

const ScreenHeader = () => {
  return (
  	<></>
  )
}

const AccountSettingsMenuHeader = () => {
	return(
	 	<Header screenHeader={<ScreenHeader/>} statusBar={{}} />
	);
}

export default AccountSettingsMenuHeader
