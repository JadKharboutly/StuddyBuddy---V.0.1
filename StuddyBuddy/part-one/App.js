import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Components
import LandingPage from './src/Screens/LandingPage';
import SignUp from './src/Screens/SignUp';

//Navigation
import Navigation from './Routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>

  );
}


