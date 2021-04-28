import React from 'react'
import { css } from 'styled-components'
import styled from 'styled-components/native'

import Theme from './Theme'

import DatePicker from 'react-native-date-picker'

interface StyledProps {
  theme: ITheme;
}

const inputStyles = css`
	width: 100%;
	margin: 6px 26px 7px; 
	border-radius: 4px;
	align-items: center;
	align-content: center;
	justify-content: center;	
`
export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'hsla(240, 6%, 25%, .6)'
})`
	width: 100%;
	margin: 6px 26px 7px; 
	padding: 0 26px;
	border-radius: 26px;
	font-size: 16px;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.light};
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 46.5px;
`

export const DateInput = styled(DatePicker)`
	${inputStyles};
	height: 45px;
`
export const MessageInput = styled.TextInput.attrs({
  placeholderTextColor: 'hsla(240, 6%, 25%, .6)'
})`
	height: 39px;
	padding: 0 26px;
	font-size: 16px;
	flex: 1;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.light};
    border-radius: 26px;
    color: ${(props: StyledProps) => props.theme && props.theme.color.body};  
`

export const InputBox = styled.View`
	justify-content: space-between;
	flex-direction: row;
	width: 100%;
	padding: 13px 0 13px 13px;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.fadedWhite};
`

export const Toggle = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	width: 100%;
`

export const ToggleButton = styled.Switch`
	margin: 7px;
`

export const Label = styled.Text`
	font-size: 16px;
	padding: 13px;
	color: ${(props: StyledProps) => props.theme && props.theme.color.light};  
`

