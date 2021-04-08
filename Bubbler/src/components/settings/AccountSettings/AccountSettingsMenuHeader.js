import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { PageHeader } from '../../../styled'

import { Header } from '../../common';

const ScreenHeader = () => {
  return (
  	<PageHeader>

  	</PageHeader>
  )
}

const AccountSettingsMenuHeader = () => {
	return(
	 	<Header screenHeader={<ScreenHeader/>} statusBar={{}} />
	);
}

export default AccountSettingsMenuHeader;