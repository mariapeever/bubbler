import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { unwrapResult } from '@reduxjs/toolkit'

import { StackActions } from '@react-navigation/native'

import { userAdded, createUser, selectUser } from '../../../reducers/userSlice'

import { Container } from '../../common'

import { 
  ButtonDefault, 
  ButtonTitle, 
  Page,
  Input,
  Inner, 
  DateInput } from '../../../styled'

import SignUpHeader from './SignUpHeader'

const SignUpScreen = ({ navigation }) => {
  
  const user = useSelector(state => state.user)
  const [firstName, setFirstName] = useState('Test')
  const [lastName, setLastName] = useState('User')
  const [email, setEmail] = useState('test@email.com')
  const [dob, setDob] = useState(new Date(1598051730000).toJSON())
  const [mobile, setMobile] = useState('078626575576')
  const [username, setUsername] = useState('test3626')
  const [password, setPassword] = useState('1ehG8_43d')
  const [rePassword, setRePassword] = useState('1ehG8_43d')

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = [
      firstName,
      lastName,
      (email || mobile),
      dob,
      username,
      password,
      rePassword,
      (password === rePassword)].every(Boolean) && 
      addRequestStatus === 'idle'
  
  const dispatch = useDispatch()

  const onFirstNameChanged = e => setFirstName(e)
  const onLastNameChanged = e => setLastName(e)
  const onEmailChanged = e => setEmail(e)
  const onDobChanged = e => setDob(e.toJSON())
  const onMobileChanged = e => setMobile(e)
  const onUsernameChanged = e => setUsername(e)
  const onPasswordChanged = e => setPassword(e)
  const onRePasswordChanged = e => setRePassword(e)

  const onSignUpClicked = async () => {
  	
  	if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          createUser({
            firstName,
            lastName,
            email,
            dob,
            mobile,
            username,
            password
          })
        )
        setAddRequestStatus('success')
        unwrapResult(resultAction)
        dispatch(
          userAdded(resultAction)
        )
        
        let payload = resultAction.payload

        setFirstName(payload.firstName)
        setLastName(payload.lastName)
        setEmail(payload.email)
        setDob(payload.dob)
        setMobile(payload.mobile)
        setUsername(payload.username)
        setPassword('')
        setRePassword('')

        navigation.dispatch(
          StackActions.replace('Login')
        )
      } catch (err) {
        setAddRequestStatus('failed')
        console.error('Create user failed: ', err)
      }  finally {
        setAddRequestStatus('idle')
      }
  	}
  }

  return(
  	<>
  		<SignUpHeader />
  		
			<Page>
        <Inner>
  				<Input
  					id='firstName'
  					name='firstName'
  					value={firstName}
  					placeholder='First name'
  					textContentType='givenName'
  					onChangeText={onFirstNameChanged}
  				/>
  				<Input
  					id='lastName'
  					name='lastName'
  					value={lastName}
  					placeholder='Last name'
  					textContentType='familyName'
  					onChangeText={onLastNameChanged}
  				/>
  				<Input
  					id='email'
  					name='email'
  					value={email}
  					placeholder='Email'
  					textContentType='emailAddress'
  					onChangeText={onEmailChanged}
  				/>
          <DateInput
            
            value={dob}
            mode="date"
            onDateChange={onDobChanged}
          />
  		
  				<Input
  					id='mobile'
  					name='mobile'
  					value={mobile}
  					placeholder='Mobile'
  					textContentType='telephoneNumber'
  					onChangeText={onMobileChanged}
  				/>
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
  				<Input
  					id='rePassword'
  					value={rePassword}
  					secureTextEntry={true}
  					placeholder='Confirm Password'
  					textContentType='password'
  					onChangeText={onRePasswordChanged}
  				/>
  				<ButtonDefault onPress={onSignUpClicked}>
  					<ButtonTitle>Sign up</ButtonTitle>
  				</ButtonDefault>
        </Inner>
			</Page>

	</>
  )
}

const SignUp = ({ navigation }) => {
  
  return(
  	<Container screen={<SignUpScreen  navigation={ navigation } />} />
  )
}

export default SignUp