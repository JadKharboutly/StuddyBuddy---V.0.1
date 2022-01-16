import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

//NavBar
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Ionicons  from 'react-native-vector-icons/Ionicons'
//Componenets
import Home from '../Home'
import Profile from '../Profile';
import Chat from '../Chat/Chat';
import ChatApp from '../Chat/ChatApp';
import Map from '../../Map'

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator
          screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === 'Map') {
                iconName = focused
                  ? 'ios-map'
                  : 'ios-map-outline';
              } else if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'md-person-sharp' : 'md-person-outline';
              }
              return <Ionicons name={iconName} size={23} color={color} />;
            },
            tabBarActiveTintColor:'black',
            tabBarInactiveTintColor:'pink',
            headerShown:false
          })}
        >
                    <Tab.Screen name="Home" component={Home} />

          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Chat" component={ChatApp} />
          <Tab.Screen name="Profile" component={Profile} />

        </Tab.Navigator>
    );
}

export default Navigation



// export default function App() {
//     return (
//         <Tab.Navigator
//         screenOptions={{headerShown:false}}
//           screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color }) => {
//               let iconName;
//               if (route.name === 'Map') {
//                 iconName = focused
//                   ? 'ios-map'
//                   : 'ios-map-outline';
//               } else if (route.name === 'Home') {
//                 iconName = focused ? 'ios-home' : 'ios-home-outline';
//               } else if (route.name === 'Profile') {
//                 iconName = focused ? 'md-person-circle-sharp' : 'md-person-outline';
//               }
//               return <Ionicons name={iconName} size={23} color={color} />;
//             },
//             tabBarActiveTintColor:'black',
//             tabBarInactiveTintColor:'pink',
//           })}
//         >
//           <Tab.Screen name="Profile" component={Profile} />
//           <Tab.Screen name="Home" component={Home} />
//           <Tab.Screen name="Chat" component={Chat} />
  
//         </Tab.Navigator>
//     );
//   }