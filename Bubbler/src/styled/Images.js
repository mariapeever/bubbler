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
	width: ${props => props.size === 'sm' ? '39px' : '52px'};
	height: ${props => props.size === 'sm' ? '39px' : '52px'};
	border-radius: 999px;
`

export const Avatar = styled(SectionListingImage)`
	
`

export const Logo = styled.Image`
	width: 91px;
	height: 91px;
	margin-bottom: 13px;
`





