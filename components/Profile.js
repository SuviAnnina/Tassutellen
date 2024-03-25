import { Text, View, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import Styles from './Styles';
import { auth } from "./Firestore";
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';



export default function Profile({ updateUserStatus }) {

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Signed out successfully");
            })
            .catch((error) => {
                Alert.alert("An error occurred during sign out");
                console.log("An error occurred during sign out: " + error);
            });
    };

    //const navigation = useNavigation();



    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.header}>Profiili</Text>

            </View>
            <TouchableOpacity
                style={Styles.signOutButton}
                onPress={handleSignOut}
            >
                <Text style={Styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </>
    );
}
