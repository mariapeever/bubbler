import React, { useState } from 'react'

import { Container } from '../common'

import { Text } from 'react-native'

const PrivCListScreen = ({ navigation }) => {

  return(
  	<Text>Chats</Text>
  )
}

const PrivCList = ({ navigation }) => {
  
  return(
  	<Container screen={<PrivCListScreen  navigation={ navigation } />} />
  )
}

export default PrivCList