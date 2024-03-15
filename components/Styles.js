import { StyleSheet, Text, View } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "5%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: "100%",
        height: "90%",
    },
    searchContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
        /* height: '7%' */
    },
    TextInput: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Styles;