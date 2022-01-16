import React from 'react'
import { View, Text } from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
//Componenets
import LandingPage from '../src/Screens/LandingPage';
import SignUp from '../src/Screens/SignUp';
import SignInPage from '../src/Screens/SignInPage';
import LoginApp from '../src/Screens/LoggedIn/LoginApp';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
            <Stack.Navigator screenOptions={{headerShown:false}} sty>
                <Stack.Screen name='LandingPage' component={LandingPage}/>
                <Stack.Screen name='SignUpPage' component={SignUp}/>
                <Stack.Screen name='SignInPage' component={SignInPage}/>
                <Stack.Screen name='LoginApp' component={LoginApp}/>

            </Stack.Navigator>
    )
}

export default Navigation
