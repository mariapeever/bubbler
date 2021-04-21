import React from 'react'
import { pure } from 'recompose'
import { SafeAreaView } from 'react-native'

import { MainContainer } from '../../styled/Layout'

const Container = (props) => {
  
  return(
  	<MainContainer>
	 	{props.screen}
	</MainContainer>

  )
}

export default Container
