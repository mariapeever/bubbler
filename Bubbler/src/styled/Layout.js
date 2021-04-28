import React from 'react'
import styled from 'styled-components/native'

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const MainContainer = styled.SafeAreaView`
	flex: 1;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.base};
`
export const Page = styled.View`
	flex: 1;
	width: 100%;
`
export const Inner = styled.View`
	flex: 1;
	padding: 26px;
	align-items: center;
	align-content: center;
	justify-content: center;

`
const ToolbarBase = styled.View`
	width: 100%;
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
` 
export const BottomToolbar = styled(ToolbarBase)`
	align-items: flex-end;
`

export const TopToolbar = styled(ToolbarBase)`
	align-items: flex-start;
`

export const Stream = styled.FlatList`
	flex: 1;
	flex-grow: 11;
	padding: 26px 13px;
	align-content: flex-end;
	flex-direction: column-reverse;
`

export const List = styled.FlatList`
	flex: 1;
	align-content: flex-start;
	width: 100%;
`
