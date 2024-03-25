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

    loginContainer: {
        // backgroundColor: "green",
        //width: "80%",
        flexDirection: "column",
        alignItems: "center",
        //width: 200
    },
    loginButton: {
        fontSize: 16,
        backgroundColor: "#71D6AB",
        borderRadius: 10,
        padding: 5,
    },

    signUpButton: {
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: "white",
        padding: 5,

    },

    loginButtonContainer: {
        //backgroundColor: "pink",
        flexDirection: "row",
        justifyContent: "space-around"
    },

    signOutButton: {
        fontSize: 14,
        backgroundColor: "#b34832",
        borderRadius: 10,
        padding: 5,
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
        backgroundColor: "#71D6AB",
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
    textInput: {
        fontSize: 18,
        textAlign: 'center',
    },

    loginInput: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: "15%",
        //paddingHorizontal: 10,
        //paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: 250,
        //backgroundColor: "pink",

    },
    /*   tabNavigatorContainer: {
          backgroundColor: "pink",
          flex: 1,
      }, */
    tabBarStyling: {
        maxHeight: "8%",
        paddingBottom: 1,
    },
    logoImage: {
        width: 222,
        height: 207,
        marginBottom: "5%"
    }
});

export default Styles;