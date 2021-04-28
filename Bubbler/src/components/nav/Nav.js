import React from 'react'
import { pure } from 'recompose'
import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Wall } from '../wall'
import { PrivCList } from '../privCList'

import { Settings } from '../settings'

import Theme from '../../styled/Theme'

const Tab = createBottomTabNavigator();

function Nav(props, { navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Wall"
      tabBarOptions={{
        activeTintColor: Theme.color.mainHighlight
      }}
    >
      <Tab.Screen
        name="Wall"
        component={Wall}
        options={{
          tabBarLabel: 'Wall',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PrivCList"
        component={PrivCList}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-chatbubble-ellipses-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Nav
