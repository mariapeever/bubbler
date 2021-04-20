import React from 'react'
import styled from 'styled-components/native'

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const PageHeader = styled.View`
	margin-top: -48px;
	z-index: 999;
	shadow-color: ${(props: StyledProps) => props.theme && props.theme.background.white};
	shadow-offset: {
		width: 200,
		height: 200,
	};
	shadow-opacity: .9;
	shadow-radius: 2;	
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.fadedWhite};
	height: 91px;
`



