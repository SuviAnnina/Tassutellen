import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';


export default function Map() {

    const [mapRegion, setMapRegion] = useState({
        latitude: 60.192059,
        longitude: 24.945831,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
    });


    return (

        <MapView
            style={Styles.mapStyle}
            region={mapRegion}
        />
    );
}

