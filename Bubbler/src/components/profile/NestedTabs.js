import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { selectUser } from '../../reducers/usersSlice'

import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()

import {
    View,
    Image,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    Button,
  } from 'react-native'

  const styles = StyleSheet.create({
      photoGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap'
      },
      photoWrap: {
            margin:2,
            height: 120,
            width: (Dimensions.get('window').width / 3) -4,
        },
        photo: {
          flex: 1,
          width: null,
          alignSelf: 'stretch'
        },
        infoBody: {
          flex: 1,
          margin: 5,
          backgroundColor: '#FFFFFF',
          padding: 20,
          justifyContent: "space-between",
        },
        verLine: {
          marginBottom: 10,
          borderBottomColor: '#b0b8b3',
          borderBottomWidth: 1,
        },
        textInfo: {
          margin: 10,
          justifyContent: "center",
          alignItems: 'center',
          fontSize: 20,
          color: '#5f5f60',    
        },
        infoIcons: {
          paddingTop: 20,
          // color: '#32a889'
          color: '#3a56d6'
        },
  })
const PostsStack = createStackNavigator();
  
function PostsStackScreen() {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen name="Posts" component={PostsScreen} 
      options={{ title: 'Gallery', headerMode: 'none', headerShown : false}}
      />
      {/* other screens */}
    </PostsStack.Navigator>
  );
}

function PostsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Posts Screen</Text>
      </View>
    );
  }
  

  function GalleryScreen() {

    return (
        <ScrollView>
            <View style={ styles.photoGrid }>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/1.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/2.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/3.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/4.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/5.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/6.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/7.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/8.jpeg')}/>
                </View>
                <View style={ styles.photoWrap }>
                    <Image style={styles.photo} source={require('../../assets/images/grid/9.jpeg')}/>
                </View>
            </View>
        </ScrollView>
    );
  }
  
  const GalleryStack = createStackNavigator();
  
  function GalleryStackScreen() {
    return (
      <GalleryStack.Navigator>
        <GalleryStack.Screen name="GALLERY" component={GalleryScreen} 
        options={{ title: 'Gallery', headerMode: 'none', headerShown : false}}
    />
        {/* other screens */}
      </GalleryStack.Navigator>
    );
  }
  
  function InfoScreen({ navigation }) {


	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [mobile, setMobile] = useState('')
	const [dob, setDob] = useState('')

	useEffect(() => {
    const user = selectUser()
		setFirstName(user.firstName)
		setLastName(user.lastName)
		setEmail(user.email)
		setMobile(user.mobile)

    let date = new Date(user.dob);
    
    date = date.toLocaleDateString()

		setDob(date)
	}, [navigation])

    return (
      
      <ScrollView>
        <View style={styles.infoBody}>
          <View style={styles.verLine}>
            <Text style={styles.textInfo}>
              <Ionicons style={styles.infoIcons} name="person-outline" size={27}/> &nbsp; &nbsp;
              {firstName} {lastName}
            </Text>
          </View>
          <View style={styles.verLine}>
            <Text style={styles.textInfo}>
              <Ionicons style={styles.infoIcons} name="mail-open-outline" size={27}/> &nbsp; &nbsp;
              {email} 
            </Text>
          </View>
          <View style={styles.verLine}>
            <Text style={styles.textInfo}>
              <Ionicons style={styles.infoIcons} name="call-outline" size={27}/> &nbsp; &nbsp;
              {mobile} 
            </Text>
          </View>
          <View style={styles.verLine}>
            <Text style={styles.textInfo}>
              <Ionicons style={styles.infoIcons} name="calendar-outline" size={27}/> &nbsp; &nbsp;
              {dob}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  

    
const InfoStack = createStackNavigator();

function InfoStackScreen() {
    return (
    <InfoStack.Navigator>
        <InfoStack.Screen name="Info" component={InfoScreen} 
        options={{ title: 'Gallery', headerMode: 'none', headerShown : false}}
        />
        {/* other screens */}
    </InfoStack.Navigator>
    );
}

  const Tab = createMaterialTopTabNavigator();
  
  function HomeTabs() {
    return (
      <Tab.Navigator>
        
        <Tab.Screen name="Gallery" component={GalleryStackScreen} />
        <Tab.Screen name="Posts" component={PostsStackScreen} />
        <Tab.Screen name="Info" component={InfoStackScreen} />
      </Tab.Navigator>
    );
  }
  
  const RootStack = createStackNavigator();

  export default function App() {
    return (
          <RootStack.Navigator>
            <RootStack.Screen name="HOME" component={HomeTabs} 
            options={{ title: 'Gallery', headerMode: 'none', headerShown : false}}
        />
          </RootStack.Navigator>
    );
  }

