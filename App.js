import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Styles from './components/Styles';
import Map from './components/Map';
import Home from './components/Home';
import Profile from './components/Profile';
import { Feather } from "@expo/vector-icons";
import Login from './components/Login';


const Tab = createBottomTabNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Map") {
              iconName = focused ? "map-pin" : "map-pin";
            } else if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Profile") {
              iconName = focused ? "user" : "user";
            } else if (route.name === "Login") {
              iconName = focused ? "log-in" : "log-in";
            }

            return (
              <Feather
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarLabel: "",
          tabBarActiveTintColor: "#71D6AB",
          tabBarInactiveTintColor: "#596b64",
          tabBarStyle: Styles.tabBarStyling,

          /* safeAreaInsets: {
            bottom: 0,
          }, */
        })}>
        <Tab.Screen name="Map" component={Map} options={{ headerShown: false }} />
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />

      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}