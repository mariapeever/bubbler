import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { unwrapResult } from '@reduxjs/toolkit'

import { StackActions, CommonActions } from '@react-navigation/native'

import { selectUser, fetchUser, userFetched, updateUser, userUpdated } from '../../../reducers/usersSlice'

import { Container } from '../../common'

import { 
  Text,
  Button,
  ButtonDefault, 
  ButtonTitle, 
  Page,
  Input } from '../../../styled'

import SettingsHeader from '../SettingsHeader'

const EditMobileScreen = ({ navigation }) => {

  const user = selectUser()

  const [id, setId] = useState(user.id)
  
  const [mobile, setMobile] = useState(user.mobile)

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = addRequestStatus === 'idle'
  
  const dispatch = useDispatch()

  const onMobileChanged = e => setMobile(e)

  const onSaveClicked = async () => {
    
    if (canSave) {
      try {
        setAddRequestStatus('pending')

        const resultAction = await dispatch(
          updateUser({
            id,
            mobile
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
          id='mobile'
          name='Mobile'
          value={mobile}
          placeholder='Mobile'
          textContentType='telephoneNumber'
          onChangeText={onMobileChanged}
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