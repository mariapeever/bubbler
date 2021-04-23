import React, { useState, useEffect } from 'react'
import { pure } from 'recompose'

import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Buffer } from 'buffer'
import { 
  login, 
  selectUserId,
  userLoggedIn, 
  fetchUser,
  fetchUsersFromList,
  usersFetchedFromList,
  selectUser } from '../../../reducers/usersSlice'

import { 
  fetchPrivCList, 
  privCListFetched,  
  selectPrivCList_Active,
  selectPrivCList_Pending,
  selectPrivCList_Hidden,
  selectPrivCList_Archived } from '../../../reducers/privCListSlice'

import { 
  fetchPrivateChatsFromList, 
  privateChatsFetchedFromList, 
  selectPrivateChats } from '../../../reducers/privateChatsSlice'

import { 
  fetchPrivCMsgList, 
  privCMsgListFetched, 
  selectPrivCMsgList_OK,
  selectPrivCMsgList_Pending,
  selectPrivCMsgList_Flagged,
  selectPrivCMsgList_Removed,
  selectPrivCMsgLists } from '../../../reducers/privCMsgListsSlice'

import { 
  fetchPrivCMessagesFromList, 
  privCMessagesFetchedFromList } from '../../../reducers/privCMessagesSlice'

import { 
  fetchPrivCParticList,
  privCParticListFetched, 
  selectPrivCParticList_Admin,
  selectPrivCParticList_Active, 
  selectPrivCParticList_Pending,
  selectPrivCParticList_Inactive,
  selectPrivCParticList_Flagged,
  selectPrivCParticList_Blocked } from '../../../reducers/privCParticListsSlice'

import {
  privCParticipantsFetchedFromList,
  fetchPrivCParticipantsFromList,
  selectPrivCParticipants,
  selectPrivCParticipants_Users } from '../../../reducers/privCParticipantsSlice'

import { 
  InteractionManager,
  Button } from 'react-native'

import { ButtonDefault, 
         ButtonTitle,
         Inner,
         Page,
         Input, 
         DateInput } from '../../../styled'

import { Container } from '../../common'
import LoginHeader from './LoginHeader'

const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState('test36263237')
  const [password, setPassword] = useState('1ehG8_423d')

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canLogin = [
      username,
      password].every(Boolean) && 
      addRequestStatus === 'idle'
  
  const dispatch = useDispatch()

  const loadPrivCList = async privCListId => {
    const fetchedPrivCList = privCListId != '' ? 
      await dispatch(fetchPrivCList(privCListId))
              .then(unwrapResult) : false
    
    if (fetchedPrivCList) {
      dispatch(privCListFetched(fetchedPrivCList))
      return true
    }
    return false
  }

  const loadPrivateChats = async privCList => {
    
    const fetchedPrivateChats = privCList.length ? 
      await dispatch(fetchPrivateChatsFromList(privCList))
              .then(unwrapResult) : false

    if (fetchedPrivateChats) {
      dispatch(privateChatsFetchedFromList(fetchedPrivateChats))
      return true
    }
    return false
  }

  const loadPrivCMsgList = async privCMsgListId => {

    const fetchedPrivCMsgList = privCMsgListId != '' ? 
      await dispatch(fetchPrivCMsgList(privCMsgListId))
              .then(unwrapResult) : false
    
    if (fetchedPrivCMsgList) {
      dispatch(privCMsgListFetched(fetchedPrivCMsgList))
      return true
    }
    return false
  }

  const loadPrivCMessages = async privCMsgList  => {
    const fetchedPrivCMessages = privCMsgList.length ? 
      await dispatch(fetchPrivCMessagesFromList(privCMsgList))
              .then(unwrapResult) : false

    if (fetchedPrivCMessages) {
      dispatch(privCMessagesFetchedFromList(fetchedPrivCMessages))
      return true
    }
    return false
  }

  const loadPrivCParticList = async privCParticListId => {

    const fetchedPrivCParticList = privCParticListId != '' ? 
      await dispatch(fetchPrivCParticList(privCParticListId))
              .then(unwrapResult) : false

    if (fetchedPrivCParticList) {
      dispatch(privCParticListFetched(fetchedPrivCParticList))
      return true
    }
    return false
  }

  const loadPrivCParticipants = async privCParticList  => {

    const fetchedPrivCParticipants = privCParticList.length ? 
      await dispatch(fetchPrivCParticipantsFromList(privCParticList))
              .then(unwrapResult) : false

    if (fetchedPrivCParticipants) {
      dispatch(privCParticipantsFetchedFromList(fetchedPrivCParticipants))
      return true
    }
    return false
  }

  const loadUsers = async usersList  => {
    const fetchedUsers = usersList.length ? 
      await dispatch(fetchUsersFromList(usersList))
              .then(unwrapResult) : false

    if (fetchedUsers) {
      var usersFetched = await dispatch(usersFetchedFromList(fetchedUsers))
      return true
    }
    return false
  }

  const fetchAll = async () => {
    try {
      let user = selectUser()
      let pricCListId = user.privateChats

      let loadedPrivCList = await loadPrivCList(pricCListId)
      let privCList = {}

      privCList = loadedPrivCList ? [
        ...selectPrivCList_Active(),
        ...selectPrivCList_Pending(),
        ...selectPrivCList_Hidden(),
        ...selectPrivCList_Archived()
      ] : []

      let loadedPrivateChats = await loadPrivateChats(privCList)
      
      let privateChats = loadedPrivateChats ? selectPrivateChats() : []

      if (privateChats.length) {
        privateChats.forEach(async chat => {

          // Fetch private chat messages
          let msgListId = chat.messagesList
          let loadedPrivCMsgList = await loadPrivCMsgList(msgListId)
          
          let privCMsgList = []

          privCMsgList = loadedPrivCMsgList ? [
            ...selectPrivCMsgList_OK(msgListId),
            ...selectPrivCMsgList_Pending(msgListId),
            ...selectPrivCMsgList_Flagged(msgListId),
            ...selectPrivCMsgList_Removed(msgListId)
          ] : false

          let loadedPrivCMessages = await loadPrivCMessages(privCMsgList)
          // fetch private chat participants
          let particListId = chat.participantsList

          let loadedPrivCParticList = await loadPrivCParticList(particListId)
          
          let privCParticList = []

          privCParticList = loadedPrivCParticList ? [
            ...selectPrivCParticList_Admin(particListId),
            ...selectPrivCParticList_Active(particListId),
            ...selectPrivCParticList_Pending(particListId),
            ...selectPrivCParticList_Inactive(particListId),
            ...selectPrivCParticList_Flagged(particListId),
            ...selectPrivCParticList_Blocked(particListId),
          ] : false
          
          let loadedPrivCParticipants = await loadPrivCParticipants(privCParticList)
          
          let privCParticipants_Users = loadedPrivCParticipants ? 
            selectPrivCParticipants_Users(privCParticList) : []

          let loadedUsers = privCParticipants_Users.length ? 
            await loadUsers(privCParticipants_Users) : false
        })
      }
    } catch (err) {
      console.error('Login ::',err)
    } finally {
      console.log('User :: Logged in')
    }
    
  }
    

  const onUsernameChanged = e => setUsername(e)
  const onPasswordChanged = e => setPassword(e)

  const onLoginClicked = async () => {
    
  	if (canLogin) {
      try {
        console.log('Login :: logging in...')
        setAddRequestStatus('pending')

        const loginUser = await dispatch(
          login({
            username,
            password
          })
        ).then(unwrapResult)

        dispatch(userLoggedIn(loginUser))
        setAddRequestStatus('success')

        fetchAll()

        navigation.dispatch(
          StackActions.replace('Nav')
        )
        
      } catch (err) {
        setAddRequestStatus('failed')
        console.error('Login failed: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
  	}
  }
  
  return(
  	<>
      
  		<LoginHeader />
  		
			<Page>
        <Inner>
  				<Input
  					id='username'
  					name='username'
  					value={username}
  					placeholder='Username'
  					textContentType='nickname'
  					onChangeText={onUsernameChanged}
  				/>
  				<Input
  					id='password'
  					value={password}
  					secureTextEntry={true}
  					placeholder='Password'
  					textContentType='password'
  					onChangeText={onPasswordChanged}
  				/>
  				<ButtonDefault onPress={onLoginClicked}>
  					<ButtonTitle>Login</ButtonTitle>
  				</ButtonDefault>
          
        </Inner>
			</Page>
      <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
      />
	</>
  )
}

const Login = ({ navigation }) => {
  
  return(
  	<Container screen={<LoginScreen navigation={ navigation }/>} />
  )
}
export default Login
