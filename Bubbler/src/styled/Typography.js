import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const LightTitle = styled.Text`
	color: ${(props: StyledProps) => props.theme && props.theme.color.fadedWhite};
`

export const LightText = styled.Text`
	color: ${(props: StyledProps) => props.theme && props.theme.color.fadedWhite};
`

export const SectionTitle = styled.Text`
	padding: 13px 26px;
	text-transform: uppercase;
	font-size: 14px;
	color: ${(props: StyledProps) => props.theme && props.theme.color.placeholder};
`