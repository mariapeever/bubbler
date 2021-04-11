import React from 'react'
import styled from 'styled-components/native'

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const PageHeader = styled.View`
	margin-top: -48px;
	opacity: .9;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.fadedWhite};
	height: 91px;
`



