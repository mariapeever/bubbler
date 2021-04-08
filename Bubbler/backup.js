import React, { useEffect, useState, Component } from 'react';

import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';

let path = RNFS.MainBundlePath + '/www';

let server = new StaticServer(443, path, {keepAlive : true });

// Start server

server.start().then((url) => {
  console.log("Serving at URL", url);
});


server.stop();

const isRunning = async () => await server.isRunning();

import { createStore } from 'redux';

import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

import { Wall } from './src/components';

// import React, { useEffect, useState } from 'react';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({
        "username": "fakeuser9",
        "password": "=]-[0p9o8iT"
      })
    })
     .catch((error) => console.error(error));
   });

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.username}</Text>
          )}
        />
      )}
    </View>
  );
};



export default App;


const App = () => {
	const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://localhost:8000/login', {
    	method: 'POST',
    	mode: 'cors',
    	body: JSON.stringify({
    		"username": "fakeuser9",
   			"password": "=]-[0p9o8iT"
    	})
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wall />
  );
}