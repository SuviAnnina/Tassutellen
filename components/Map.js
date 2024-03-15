import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Image } from 'react-native';
import Styles from './Styles';
import dogpawpic from '../pictures/dog-paw-pic.png'
import * as Location from 'expo-location';


export default function Map() {

    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        latitude: 60.192059,
        longitude: 24.945831
    });
    const [mapRegion, setMapRegion] = useState({
        latitude: 60.192059,
        longitude: 24.945831,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
    });
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dogParks, setDogParks] = useState([]);

    /* Ask for permission to get location information - if given, update map to user's location */
    useEffect(() => {
        (async () => {
            setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setMapRegion({ ...mapRegion, latitude: location.coords.latitude, longitude: location.coords.longitude });
            setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            setLoading(false);
        })();
    }, []);



    const apiKey = process.env.EXPO_PUBLIC_API_KEY;

    /* Fetch coordinates of the given address */
    const fetchCoordinates = () => {
        setLoading(true);
        const apiKey = process.env.EXPO_PUBLIC_API_KEY;
        fetch(`https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`)
            .then(response => {
                if (!response)
                    throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const firstResult = data[0];
                    const latitudeFloat = parseFloat(firstResult.lat);
                    const longitudeFloat = parseFloat(firstResult.lon);

                    setMapRegion({
                        ...mapRegion,
                        latitude: latitudeFloat,
                        longitude: longitudeFloat
                    });

                    setCoordinates({
                        latitude: latitudeFloat,
                        longitude: longitudeFloat
                    });

                    Keyboard.dismiss();
                    setAddress("");
                    setLoading(false);
                } else {
                    Alert.alert("No results found for " + address);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

    return (
        <>
            <View style={Styles.searchContainer}>
                <TextInput
                    placeholder="Syötä osoite tai postinumero"
                    style={Styles.TextInput}
                    value={address}
                    onChangeText={text => setAddress(text)} />

                <Button
                    title="Etsi"
                    onPress={fetchCoordinates} />
            </View>

            <MapView
                style={Styles.mapStyle}
                region={mapRegion}>
                <Marker
                    coordinate={coordinates}
                    title="Sijaintisi"
                >
                    <Image
                        source={dogpawpic}
                        style={{ width: 25, height: 25 }}
                    />
                </Marker>
            </MapView>

        </>
    );
}
