import { StyleSheet, Text, View } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "5%",
        // backgroundColor: '#71D6AB',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: "100%",
        height: "85%",
    },
    headerContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: "15%",
        backgroundColor: "pink",
    },
    header: {
        fontSize: 22,
        textAlign: 'center',
    },
    searchContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        //paddingTop: "2%",
        /* height: '7%' */
    },
    TextInput: {
        fontSize: 18,
        textAlign: 'center',

    },
    tabNavigatorContainer: {
        backgroundColor: "pink",
        flex: 1,
    },
    tabBarStyling: {
        maxHeight: "6%",
        paddingBottom: 1,
    },
});

export default Styles;