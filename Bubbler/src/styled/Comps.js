import React from 'react'
import styled from 'styled-components/native'

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const SectionListing = styled.TouchableOpacity`
	flex-direction: row;
	padding: 0 26px;
	height: 91px;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.white};
`

export const SectionListingTitle = styled.Text`
	font-size: 18px;
	margin-bottom: 4px;
	font-weight: 500;
	color: ${(props: StyledProps) => props.theme && props.theme.color.body};
`

export const SectionListingContainer = styled.View`
	border-top-width: 1px;
	margin-top: -1px;
	border-color: ${(props: StyledProps) => props.theme && props.theme.color.border};
`
export const SectionListingBorder = styled.View`
	flex-direction: row;
	justify-content: space-between;
	flex: 1;
	align-items: stretch;
	border-bottom-width: 1px;
	border-color: ${(props: StyledProps) => props.theme && props.theme.color.border};
`

export const SectionListingImage = styled.Image`
	align-self: center;
	width: 52px;
	height: 52px;
	border-radius: 999px;
`

export const SectionListingContent = styled.View`
	flex: 1;
	font-size: 16px;
	padding: 13px;
	align-content: flex-start;
	line-height: 26px;
`

export const SectionListingDescription = styled.Text`
	font-size: 16px;
	flex: 1;
	color: ${(props: StyledProps) => props.theme && props.theme.color.light};
`

export const SectionListingLabel = styled.Text`
	font-size: 16px;
	border-bottom-width: 1px;
	padding-top: 13px;
	border-color: ${(props: StyledProps) => props.theme && props.theme.color.border};
	color: ${(props: StyledProps) => props.theme && props.theme.color.light};
`

export const Stream = styled.FlatList`
	flex: 1;
	flex-grow: 11;
	padding: 26px 13px;
	align-items: flex-end;
	align-content: flex-end;
	flex-direction: column-reverse;
` 

export const MessageBubble = styled.View`
	max-width: 80%;
	margin-bottom: ${props => props.nextSelf ? '3px' : '13px'};
	border-radius: 26px;
	align-self: ${props => props.self == true ? 'flex-end' : 'flex-start'};
	padding: 13px 18px;
	background-color: ${props => props.self == true ? props.theme.background.mainHighlight : props.theme.background.light};
`




