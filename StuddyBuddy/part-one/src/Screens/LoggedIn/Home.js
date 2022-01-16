import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect,useState } from 'react'
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font'; 
import { Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic, Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic, Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic } from '@expo-google-fonts/poppins'
//FireBase
import { auth } from '../../../firebase'

//Components
import FindBuddy from '../../Components/FindBuddy'
import FindGroup from '../../Components/FindGroup'
import Buddy from '../../Components/Buddy'


const Home = () => {

    let [fontsLoaded] = useFonts ( {Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic, Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic, Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic});



    const [info,setInfo] = useState('');

    async function getInfo(e){
        try{
             const response = await fetch('http://192.168.2.17:5000/userInfo',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:e})
            })
            const data = await response.json()
            setInfo(data)
            }catch(error){
                console.log(error)
            }
    }

    useEffect(()=>{
        getInfo(auth.currentUser.email)
    },[])
    // if(!fontsLoaded){
    //     <AppLoading/>
    // }
    return (
        <SafeAreaView style={styles.container}>

            <>
            <Text style={styles.text}>{`What would you \n like to do today \n ${info?.fullName}?`}</Text>
            <View style={styles.container_TWO}>
            <FindBuddy/>
            <FindGroup/>
            </View>
            </>




        </SafeAreaView>

    )
}

export default Home
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#EDDBDB',
        paddingTop:40,
        

    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        marginLeft:20,
        color:"#2E3138",
        // fontFamily:'Poppins_700Bold'
    },
    container_TWO:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    nav:{
        backgroundColor:'red',
        position:'absolute',
        
    }
})