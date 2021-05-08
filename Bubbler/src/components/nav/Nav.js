import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PrivCList } from '../privCList'
import { Profile } from '../profile'
import { Settings } from '../settings'

import Theme from '../../styled/Theme'
import {useRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function Nav(props, { navigation }) {

  // Subscribe for the focus Listener
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      const route = useRoute()
      const params = route.params
      if (params) {
        props.navigation.push('PrivCList', params)
      }
    })
    return unsubscribe
  })
 
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: Theme.color.mainHighlight
      }}
    >
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
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
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

















