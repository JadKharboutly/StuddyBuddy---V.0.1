import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Components


//Navigation
import Navigation from './Routes';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginApp() {

  return (
    <>
          <Navigation/>
    </>
  );
}

