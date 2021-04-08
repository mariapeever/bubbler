import React from 'react'
import { css } from 'styled-components'
import styled from 'styled-components/native'

import Theme from './Theme'

import DatePicker from 'react-native-date-picker'

interface StyledProps {
  theme: ITheme;
}

export const Loader = styled.View`
	flex: 1,
    flex-direction: "row",
    justify-content: "space-around",
    padding: 10

`