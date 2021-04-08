
import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../common'

import SearchHeader from './SearchHeader'

const SearchScreen = ({navigation}) => {
	const privCList = useSelector(state => state.search)

  return(
  	<>
  		<SearchHeader />
  	</>
  )
}

const Search = ({ navigation }) => {
  
  return(
  	<Container screen={<SearchScreen navigation={ navigation }/>} />
  )
}

export default Search