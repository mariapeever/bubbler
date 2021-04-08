import React from 'react'
import styled from 'styled-components/native'

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const MainContainer = styled.SafeAreaView`
	flex: 1;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.base};
	align-items: center;
	justify-content: center;
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

