import React from 'react'
import styled from 'styled-components/native'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const SectionListingImage = styled.Image`
	align-self: center;
	width: 52px;
	height: 52px;
	border-radius: 999px;
`

export const Avatar = styled(SectionListingImage)`
	
`





