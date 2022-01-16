import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {useNavigation} from '@react-navigation/native'

//Components
import Button from '../Components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginApp from './LoggedIn/LoginApp'
const LandingPage = () => {

    const navigation = useNavigation();
    function getGetStarted(){
        navigation.navigate('SignUpPage')
        console.log('get Started')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.line1}>Welcome To</Text>
            <Text style={styles.line2}>Studdy Buddy</Text>
            <Button location='LandingPage' action={getGetStarted} title='Get Started'/>
        </View>
    )
}

export default LandingPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#EDDBDB',
    },
    line1:{
        fontSize:35,
        fontWeight:'bold',
        color:'#2E3138'
    },
    line2:{
        fontSize: 35,
        color:'#2E3138'

    }

})