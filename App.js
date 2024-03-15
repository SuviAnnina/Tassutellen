import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import Styles from './components/Styles';


import Map from './components/Map';

import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';


export default function App() {



  return (
    <View style={Styles.container}>


      <Map />

      <StatusBar style="auto" />
    </View>
  );
}
