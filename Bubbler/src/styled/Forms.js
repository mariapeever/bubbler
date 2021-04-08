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

export const Input = styled.TextInput`
	width: 100%;
	margin: 6px 26px 7px; 
	padding: 0 13px;
	border-radius: 4px;
	font-size: 16px;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.fadedWhite};
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 46.5px;
	shadow-color: "#000",
	shadow-offset: {
		width: 2,
		height: 2,
	};
	shadow-opacity: 0.1;
	shadow-radius: 5px;
	
`

export const DateInput = styled(DatePicker)`
	${inputStyles};
	height: 45px;
`