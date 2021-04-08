import React from 'react'
import styled from 'styled-components/native'

import Theme from './Theme'

interface StyledProps {
  theme: ITheme;
}

export const PageHeader = styled.View`
	width: 100%;
	padding: 13px 26px;
	line-height: 26px;
	align-items: flex-end;
	align-content: flex-end;
	justify-content: space-between;
	background-color: ${(props: StyledProps) => props.theme && props.theme.background.mainHighlight};
	height: 52px;
`



