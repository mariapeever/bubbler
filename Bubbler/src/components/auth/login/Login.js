import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { 
  login, 
  userLoggedIn, 
  fetchUser,
  anotherUserFetched,
  selectUser } from '../../../reducers/userSlice'

import { 
  fetchPrivateChatsFromList, 
  privateChatsFetchedFromList, 
  selectPrivateChats } from '../../../reducers/privateChatsSlice'

import { 
  fetchPrivCList, 
  privCListFetched, 
  selectActivePrivCListObj } from '../../../reducers/privCListSlice'

import { 
  fetchPrivCMsgList, 
  privCMsgListFetched, 
  selectOKPrivCMsgList } from '../../../reducers/privCMsgListsSlice'

import { 
  fetchPrivCMessagesFromList, 
  privCMessagesFetchedFromList } from '../../../reducers/privCMessagesSlice'

import { 
  fetchPrivCParticList,
  privCParticListFetched, 
  selectAdminPrivCParticList,
  selectActivePrivCParticList, 
  selectPendingPrivCParticList,
  selectInactivePrivCParticList,
  selectFlaggedPrivCParticList,
  selectBlockedPrivCParticList } from '../../../reducers/privCParticListsSlice'

import {
  privCParticipantsFetchedFromList,
  fetchPrivCParticipantsFromList,
  selectPrivCParticipants } from '../../../reducers/privCParticipantsSlice'

import { Button } from 'react-native'

import { ButtonDefault, 
         ButtonTitle,
         Inner,
         Page,
         Input, 
         DateInput } from '../../../styled'

import { Container } from '../../common'
import LoginHeader from './LoginHeader'

const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState('fakeuser9')
  const [password, setPassword] = useState('=]-[0p9o8iT')

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canLogin = [
      username,
      password].every(Boolean) && 
      addRequestStatus === 'idle'
  
  const dispatch = useDispatch()

  const onUsernameChanged = e => setUsername(e)
  const onPasswordChanged = e => setPassword(e)

  const onLoginClicked = async () => {
  	if (canLogin) {
      try {
        setAddRequestStatus('pending')

        const resultAction = await dispatch(
          login({
            username,
            password
          })
        )

        dispatch(userLoggedIn(resultAction))

        setAddRequestStatus('success')
        const user = selectUser()

        const fetchedPrivCList = user.privateChats != '' ? 
          await dispatch(fetchPrivCList(user.privateChats)) : false

        if (fetchedPrivCList) {
          dispatch(privCListFetched(fetchedPrivCList))
        }

        const privCList = fetchedPrivCList ? selectActivePrivCListObj() : false

        const fetchedPrivateChats = Object.keys(privCList).length ? 
          await dispatch(fetchPrivateChatsFromList(privCList)) : false

        if (fetchedPrivateChats) {
          dispatch(privateChatsFetchedFromList(fetchedPrivateChats))
          const privateChats = selectPrivateChats()

          privateChats.forEach(async chat => {
            const fetchedPrivCMsgList = chat.messagesList != '' ? await dispatch(fetchPrivCMsgList(chat.messagesList)) : false

            if (fetchedPrivCMsgList) {
              dispatch(privCMsgListFetched(fetchedPrivCMsgList))
            }

            const privCMsgList = fetchedPrivCMsgList ? selectOKPrivCMsgList(chat.messagesList) : []
            
            const fetchedPrivCMessages = privCMsgList.length ? 
              await dispatch(fetchPrivCMessagesFromList(privCMsgList)) : false

            if (fetchedPrivCMessages) {
              dispatch(privCMessagesFetchedFromList(fetchedPrivCMessages))
            }

            const fetchedPrivCParticList = chat.participantsList != '' ? await dispatch(fetchPrivCParticList(chat.participantsList)) : false
            
            if (fetchedPrivCParticList) {
              dispatch(privCParticListFetched(fetchedPrivCParticList))
            }
            const adminPrivCParticList = fetchedPrivCParticList ? selectAdminPrivCParticList(chat.participantsList) : []
            
            const fetchedAdminPrivCParticipants = adminPrivCParticList.length ? 
              await dispatch(fetchPrivCParticipantsFromList(adminPrivCParticList)) : false

            if (fetchedAdminPrivCParticipants) {
              dispatch(privCParticipantsFetchedFromList(fetchedAdminPrivCParticipants))
            }

            const activePrivCParticList = fetchedPrivCParticList ? selectActivePrivCParticList(chat.participantsList) : []

            const fetchedActivePrivCParticipants = activePrivCParticList.length ? 
              await dispatch(fetchPrivCParticipantsFromList(activePrivCParticList)) : false
            if (fetchedActivePrivCParticipants) {
              dispatch(privCParticipantsFetchedFromList(fetchedActivePrivCParticipants))
            }

            const pendingPrivCParticList = fetchedPrivCParticList ? selectPendingPrivCParticList(chat.participantsList) : []
            
            const fetchedPendingPrivCParticipants = pendingPrivCParticList.length ? 
              await dispatch(fetchPrivCParticipantsFromList(pendingPrivCParticList)) : false
            
            if (fetchedPendingPrivCParticipants) {
              dispatch(privCParticipantsFetchedFromList(fetchedPendingPrivCParticipants))
            }

            const inactivePrivCParticList = fetchedPrivCParticList ? selectInactivePrivCParticList(chat.participantsList) : []

            const fetchedInactivePrivCParticipants = inactivePrivCParticList.length ? 
              await dispatch(fetchPrivCParticipantsFromList(inactivePrivCParticList)) : false

            if (fetchedInactivePrivCParticipants) {
              dispatch(privCParticipantsFetchedFromList(fetchedInactivePrivCParticipants))
            }

            const flaggedPrivCParticList = fetchedPrivCParticList ? selectFlaggedPrivCParticList(chat.participantsList) : []
            
            const fetchedFlaggedPrivCParticipants = flaggedPrivCParticList.length ? 
              await dispatch(fetchPrivCParticipantsFromList(flaggedPrivCParticList)) : false

            if (fetchedFlaggedPrivCParticipants) {
              dispatch(privCParticipantsFetchedFromList(fetchedFlaggedPrivCParticipants))
            }

            const blockedPrivCParticList = fetchedPrivCParticList ? selectBlockedPrivCParticList(chat.participantsList) : []
            
            const fetchedBlockedPrivCParticipants = blockedPrivCParticList.length ? 
              await dispatch(fetchPrivCParticipantsFromList(blockedPrivCParticList)) : false

            if (fetchedBlockedPrivCParticipants) {
              dispatch(privCParticipantsFetchedFromList(fetchedBlockedPrivCParticipants))
            }

            const participants = selectPrivCParticipants()

            participants.forEach(async participant => {
              const fetchedParticipantUser = await dispatch(fetchUser(participant.user))
              dispatch(anotherUserFetched(fetchedParticipantUser))
            })
          
          })
        }

    

        
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