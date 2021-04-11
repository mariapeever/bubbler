import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { unwrapResult } from '@reduxjs/toolkit'

import { StackActions, CommonActions } from '@react-navigation/native'

import { selectUser, fetchUser, userFetched, updateUser, userUpdated } from '../../../reducers/userSlice'

import { Container } from '../../common'

import { 
  Text,
  Button,
  ButtonDefault, 
  ButtonTitle, 
  Page,
  Input, 
  DateInput } from '../../../styled'

import SettingsHeader from '../SettingsHeader'

const EditPersonalDetailsScreen = ({ navigation }) => {

  const user = selectUser()

  const [id, setId] = useState(user.id)
  
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [dob, setDob] = useState(user.dob)

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = addRequestStatus === 'idle'
  
  const dispatch = useDispatch()

  const onFirstNameChanged = e => setFirstName(e)
  const onLastNameChanged = e => setLastName(e)
  const onDobChanged = e => setDob(e)

  const onSaveClicked = async () => {
  	
  	if (canSave) {
      try {
        setAddRequestStatus('pending')

        const resultAction = await dispatch(
          updateUser({
          	id,
            firstName,
            lastName,
            dob
          })
        )
        setAddRequestStatus('success')
        
        dispatch(
          userUpdated(resultAction)
        )        

        navigation.goBack()
        
      } catch (err) {
        setAddRequestStatus('failed')
        console.error('Update user failed: ', err)
      }  finally {
        setAddRequestStatus('idle')
      }
  	}
  }

  return(
    <>
      <SettingsHeader />
      <Page>
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
        <DateInput
          value={dob}
          mode="date"
          onDateChange={onDobChanged}
        />
        <ButtonDefault onPress={onSaveClicked}>
          <ButtonTitle>Save</ButtonTitle>
        </ButtonDefault>

      </Page>
    </>
  )
}

const EditPersonalDetails = ({ navigation }) => {
  
  return(
  	<Container screen={<EditPersonalDetailsScreen navigation={ navigation } />} />
  )
}

export default EditPersonalDetails