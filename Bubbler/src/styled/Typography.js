import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

const Body = styled.Text`
	font-size: 16px;
`

export const LightTitle = styled.Text`
	color: ${(props: StyledProps) => props.theme && props.theme.color.fadedWhite};
`
export const LightText = styled.Text`
	color: ${(props: StyledProps) => props.theme && props.theme.color.fadedWhite};
`
export const PageTitle = styled.Text`
	padding: 13px 26px;
	font-size: 24px;
	font-weight: 600;
	color: ${(props: StyledProps) => props.theme && props.theme.color.body};
`

export const SectionTitle = styled.Text`
	padding: 13px 26px;
	text-transform: uppercase;
	font-size: 14px;
	color: ${(props: StyledProps) => props.theme && props.theme.color.placeholder};
`

export const Span = styled.Text`
	font-weight: 500;
`

export const BodyText = styled(Body)`
	color: ${props => props.white ? props.theme.color.white : props.theme.color.body};
`

export const DarkText = styled(Body)`
	color: ${props => props.self ? props.theme.color.white : props.theme.color.body};
`

export const AppTitle = styled.Text`
	font-size: 36px;
	font-weight: 200;
	margin: 13px 0 42px;
`