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
  Input } from '../../../styled'

const EditMobileScreen = ({ navigation }) => {

  const user = selectUser()

  const [id, setId] = useState(user.id)
  
  const [email, setEmail] = useState(user.email)

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = addRequestStatus === 'idle'
  
  const dispatch = useDispatch()

  const onEmailChanged = e => setEmail(e)

  const onSaveClicked = async () => {
    
    if (canSave) {
      try {
        setAddRequestStatus('pending')

        const resultAction = await dispatch(
          updateUser({
            id,
            email
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
      <Page>
        <Input
          id='email'
          name='Email'
          value={email}
          placeholder='Email'
          textContentType='email'
          onChangeText={onEmailChanged}
        />
        <ButtonDefault onPress={onSaveClicked}>
          <ButtonTitle>Save</ButtonTitle>
        </ButtonDefault>

      </Page>
    </>
  )
}

const EditMobile= ({ navigation }) => {
  
  return(
    <Container screen={<EditMobile navigation={ navigation } />} />
  )
}

export default EditMobile