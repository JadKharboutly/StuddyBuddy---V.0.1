import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useState, useEffect} from "react"
import Button from '../Components/Button'
import { useNavigation } from '@react-navigation/native'
//Component
import Input from '../Components/Input'
//FireBase
import { auth } from '../../firebase'
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"

const SignInPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                navigation.navigate("LoginApp")
            }
        })
        return unsubscribe
    },[])

    function getSignUpPage(){
        navigation.navigate('SignUpPage')
    }

    function handleSignIn(){
        signInWithEmailAndPassword(auth,email,password)
        .then((res)=>console.log(`logged in with ${res.user.email}`))
        .catch((err)=>console.log(err.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello!</Text>

            <Input name='Mac-Email' setValue={setEmail} value={email}/>
            <Input name='Password' isPassword={true} setValue={setPassword} value={password}/>

            <Button title='Sign In' action={handleSignIn}/>

            <Text style={styles.footer}>Don't have an account? <Text style={styles.link} onPress={getSignUpPage}>Sign up</Text></Text>
        </View>
    )
}

export default SignInPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:120,
        alignItems:'center',
        backgroundColor: '#EDDBDB',
    },
    text:{
        fontSize:40,
        fontWeight:'bold',
        marginBottom:100,
        color:'#2E3138'
    },
    footer:{
        position:'absolute',
        marginTop:'180%',
        fontSize:16,
        color:'#2E3138'
    },
    link:{
        fontWeight: 'bold',
        color:'#628ED3'
    }
})
