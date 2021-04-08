import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { login, userLoggedIn, selectUser, getState } from '../../../reducers/userSlice'

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
  
  const [username, setUsername] = useState('test3626')
  const [password, setPassword] = useState('1ehG8_43d')

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