import React, { useState } from 'react'
import { pure } from 'recompose'

import { View, Text, SafeAreaView, Button, StatusBar, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/dist/Ionicons'

const STYLES = ['default', 'dark-content', 'light-content']
const TRANSITIONS = ['fade', 'slide', 'none']

const Header = (props) => {
	
	const [hidden, setHidden] = useState(props.statusBar['hidden'] || false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[props.statusBar['style'] || 0]);

  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[props.statusBar['transition'] || 0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[props.statusBar['style'] || 0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  }

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[props.statusBar['transition'] || 0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  }
  return(
  	<>
	  	<StatusBar
	  		animated={props.statusBar['animated'] || true}
        backgroundColor={props.statusBar['backgroundColor'] || "#61dafb"}
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden} />
	    {props.screenHeader}
    </>
   )
}

export default Header

