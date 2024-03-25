import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Styles from './components/Styles';
import Map from './components/Map';
import Home from './components/Home';
import Profile from './components/Profile';
import { Feather } from "@expo/vector-icons";
import Login from './components/Login';
import { auth } from './components/Firestore';


const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const updateUserStatus = (userStatus) => {
    setUser(userStatus);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Map") {
                iconName = focused ? "map-pin" : "map-pin";
              } else if (route.name === "Profile") {
                iconName = focused ? "user" : "user";
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
          })}>
          <Tab.Screen name="Map" component={Map} options={{ headerShown: false }} />
          <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
      ) : (
        <Login />
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}