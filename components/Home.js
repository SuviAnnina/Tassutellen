import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Styles from './Styles';
import { useState, useEffect } from 'react';


export default function Home() {



    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.header}>Kotinäkymä</Text>
            </View>
        </>
    );
}
