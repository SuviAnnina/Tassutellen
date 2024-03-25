import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Styles from './Styles';
import { useState, useEffect } from 'react';


export default function Profile() {



    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.header}>Profiili</Text>
            </View>
        </>
    );
}
