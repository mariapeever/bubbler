import React from 'react'
import styled from 'styled-components/native'

import Ionicons from 'react-native-vector-icons/Ionicons' 
Ionicons.loadFont()

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

const ButtonBase = styled.TouchableOpacity`
	padding: 13px 26px;
	margin: 13px;
	line-height: 26px;
	align-items: center;
	align-content: center;
	justify-content: center;
	border-radius: 4px;
`
export const ButtonDefault = styled(ButtonBase)`
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.mainHighlight};
`

export const ButtonTitle = styled.Text`
	font-size: 16px;
	color: ${(props: StyledProps) => props.theme && props.theme.color.fadedWhite};
`

export const IconButtonTitle = styled(ButtonTitle)`
	margin-left: 13px;	
	color: ${(props: StyledProps) => props.theme && props.theme.color.body};
`

export const SectionButtonTitle = styled(ButtonTitle)`
	color: ${(props: StyledProps) => props.theme && props.theme.color.body};
`

export const SectionButton = styled.TouchableOpacity`
	height: 39px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: -1px;
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-color: ${(props: StyledProps) => props.theme && props.theme.color.border};
	line-height: 26px;
	padding: 7px 26px 6px;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.white};
`

export const Icon = styled(Ionicons)`
	font-size: 26px;
	color: ${(props: StyledProps) => props.theme && props.theme.color.fadedMainHightlight};
`

export const IconButton = styled(Ionicons)`
	font-size: 26px;
	color: ${(props: StyledProps) => props.theme && props.theme.color.mainHighlight};
`

export const WhiteIcon = styled(Ionicons)`
	font-size: 26px;
	line-height: 26px;
	color: ${(props: StyledProps) => props.theme && props.theme.color.white};
`
export const IconBase = styled.View`
	padding: 3px;
	height: 39px;
	width: 39px;
	border-radius: 4px;
	align-items: center;
	align-content: center;
	justify-content: center;
	background-color: ${props => props.color ? props.theme.background[props.color] : props.theme.background.mainHighlight};
`

