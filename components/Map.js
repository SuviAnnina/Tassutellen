import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { View, TextInput, Button, Keyboard, Image, Text } from 'react-native';
import Styles from './Styles';
import dogpawpic from '../pictures/dog-paw-pic.png';
import locationpic from '../pictures/location-pic.png';
import dogbeachpic from '../pictures/dogbeach-pic.png';
import * as Location from 'expo-location';
import { DogParkDataFS } from './DogParkData';
import { DogBeachDataFS } from './DogBeachData';

import { fetchDogBeachAPIData } from './DogBeachData';
import { deleteAllDogBeachDocuments } from './DogBeachData';
import { fetchDogParkAPIData } from './DogParkData';
import { deleteAllDogParkDocuments } from './DogParkData';

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
    const [allDogParkData, setAllDogParkData] = useState([]);
    const [allDogBeachData, setAllDogBeachData] = useState([]);
    const [loading, setLoading] = useState(false);

    /* Get dog park data from Firestore */
    const getDogParkData = async () => {
        try {
            const dogParkData = await DogParkDataFS();
            setAllDogParkData(dogParkData);
        } catch (error) {
            console.error("Error fetching dog park data for rendering from Firestore: " + error);
        }
    };

    /* Get dog beach data from Firestore */
    const getDogBeachData = async () => {
        try {
            const dogBeachData = await DogBeachDataFS();
            setAllDogBeachData(dogBeachData);
        } catch (error) {
            console.error("Error fetching dog beach data for rendering from Firestore: " + error);
        }
    };

    /* Ask for permission to get location information */
    const requestLocationPermission = async () => {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            /* if permission is given, update map to user's location */
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setMapRegion({ ...mapRegion, latitude: location.coords.latitude, longitude: location.coords.longitude });
            setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        } else {
            Alert.alert("Permission not given")
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                requestLocationPermission();
                await getDogParkData(); // Dogparks are fetched from Firestore
                await getDogBeachData(); // Dogbeaches are feetched from Firestore

            } catch (error) {
                console.error("Error fetching data: " + error);
            }

        };
        fetchData();
        //deleteAllDogParkDocuments(); // Delete all dogpark documents from the collection
        //deleteAllDogBeachDocuments(); // Delete all dogbeach documents from the collection
        //fetchDogParkAPIData(); // Dogparks are fetched from API and stored to Firestore
        //fetchDogBeachAPIData(); // Dogbeaches are fetched from API and stored to Firestore
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

    /* Mapview taken back to user's current location */
    const currentLocation = () => {
        if (location) {
            setLocation(location);
            setMapRegion({ ...mapRegion, latitude: location.coords.latitude, longitude: location.coords.longitude });
            setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude });

        } else {
            requestLocationPermission();
        }
    }


    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.header}>Koirapuistot ja uimarannat kartalla</Text>
            </View>
            <View style={Styles.searchContainer}>
                <TextInput

                    placeholder="Syötä osoite tai paikka"
                    style={Styles.textInput}
                    value={address}
                    onChangeText={text => setAddress(text)} />

                <Button
                    title="Etsi"
                    onPress={fetchCoordinates} />

                <Button
                    title="Sijaintisi"
                    onPress={currentLocation} />
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

                {allDogParkData.map((dogpark, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: dogpark.location.latitude,
                            longitude: dogpark.location.longitude,
                        }}
                        title={dogpark.name}
                        description={`${dogpark.address}, ${dogpark.city}`}>
                        <Image
                            source={locationpic}
                            style={{ width: 30, height: 30 }}
                        />
                    </Marker>
                ))}

                {allDogBeachData.map((dogbeach, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: dogbeach.location.latitude - 0.00005,
                            longitude: dogbeach.location.longitude - 0.00005,
                        }}
                        title={dogbeach.name}
                        description={`${dogbeach.address}, ${dogbeach.city}`}>
                        <Image
                            source={dogbeachpic}
                            style={{ width: 30, height: 30 }}
                        />
                    </Marker>
                ))}
            </MapView>

        </>
    );
}
