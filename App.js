import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Styles from './components/Styles';


import Map from './components/Map';

import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';


export default function App() {



  return (
    <View style={Styles.container}>
      <Text>Map</Text>

      <Map />

      <StatusBar style="auto" />
    </View>
  );
}
