import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Image } from 'react-native';
import Styles from './Styles';
import dogpawpic from '../pictures/dog-paw-pic.png';
import * as Location from 'expo-location';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


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

    /* Ask for permission to get location information */
    useEffect(() => {
        (async () => {
            setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }

            /* if permission is given, update map to user's location */
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setMapRegion({ ...mapRegion, latitude: location.coords.latitude, longitude: location.coords.longitude });
            setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            setLoading(false);
        })();
        fetchDogparkData();
    }, []);



    /* Fetch coordinates of the given address */
    const fetchCoordinates = () => {
        setLoading(true);
        const apiKey = process.env.EXPO_PUBLIC_API_KEY;

        fetch(`https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`)
            .then(response => {
                if (!response)
                    throw new Error("Error in coordinates fetch: " + response.statusText);
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

    /* Firestore */
    const firestoreConfig = JSON.parse(process.env.EXPO_PUBLIC_FIRESTORE);
    const app = initializeApp(firestoreConfig);
    const firestoreDB = getFirestore(app);

    /* Fetch dog park data */
    const fetchDogparkData = async () => {
        setLoading(true);

        const urls = process.env.EXPO_PUBLIC_DOGPARKS.split(',');

        try {
            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(response => response.json()));
            //console.log('Dog park data:', JSON.stringify(data));

            /* Map through all of the data + flatten result */
            const dogParkData = data.flatMap(allData => allData.results.map(dogpark => {

                /* if dogpark does not have location or location coordinates, return null in its place */
                if (!dogpark.location || !dogpark.location.coordinates) {
                    return null;
                }
                return {
                    /* Save name, address and location */
                    id: dogpark.id,
                    name: dogpark.name && dogpark.name.fi ? dogpark.name.fi : "",
                    address: dogpark.street_address && dogpark.street_address.fi ? dogpark.street_address.fi : "",
                    location: {
                        latitude: dogpark.location.coordinates[1],
                        longitude: dogpark.location.coordinates[0]
                    }
                };

                /* filter items: null items (parks without location) are filtered out */
            }).filter(Boolean));


            //console.log(JSON.stringify(dogParkData));

            // Iterate over dogParkData and add each document (dogpark object) to Firestore
            if (dogParkData.length > 0) {
                dogParkData.forEach(async (dogpark) => {
                    try {
                        const docRef = await addDoc(collection(firestoreDB, "dogparks"), dogpark);
                        //console.log("Document written with ID " + docRef.id);
                    } catch (error) {
                        console.error("Error adding document to firestore database: " + error);
                    }
                });
            } else {
                console.log("No dogpark data");
            }
            setLoading(false);

        } catch (error) {
            console.error('Error fetching dog park data:', error);
        }
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
                    title="Sijaintisi">
                    <Image
                        source={dogpawpic}
                        style={{ width: 25, height: 25 }}
                    />
                </Marker>

            </MapView>

        </>
    );
}
