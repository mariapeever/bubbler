import React, { useEffect, useState } from 'react'

import { createStackNavigator, StackActions, NavigationActions } from '@react-navigation/stack';

import { Container } from '../common'
import { selectUser } from '../../reducers/usersSlice'

import ProfileHeader from './ProfileHeader'

import { 
	Page,
} from '../../styled'

import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native'

import NestedTabs from './NestedTabs'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  userImage: {
    // borderColor: '#FFF',
    alignSelf: 'center',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    width: 170,
    marginTop: 140,
    
  },
  headerBackgroundImage: {
    width: '100%',
    height: 325,
    marginBottom: 0,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: 100,
  },
  nameBG: {
    backgroundColor: 'rgba(128,0,128,0.4)',
    padding: 25,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -18,
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})


const ProfileScreen = ({ navigation }) => {

  const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	useEffect(() => {
    const user = selectUser()
		setFirstName(user.firstName)
		setLastName(user.lastName)
	}, [navigation])

  return(
    <>
  		<ProfileHeader />
			<Page>
        <View style={styles.container}>
          <ImageBackground
              style={styles.headerBackgroundImage}
              source={require('../../assets/images/profile.jpeg')}
          >

            <Image
              style={styles.userImage}
              source={require('../../assets/images/bg.jpeg')}
            />
          </ImageBackground>
        </View>
        <NestedTabs/>
			</Page>
    </>
  )
}

const Profile = ({ navigation }) => {
  
  return(
  	<Container screen={<ProfileScreen navigation={ navigation }/>} />
  )
}

export default Profile