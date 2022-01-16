import React from 'react'
import {useState,useEffect} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../Components/Button'
import { useNavigation } from '@react-navigation/native'
//Component
import Input from '../Components/Input'
//Firebase
import { auth } from '../../firebase'
import {createUserWithEmailAndPassword} from "firebase/auth"
import { async } from '@firebase/util'

const SignUp = () => {
    const [email,setEmail] = useState('');
    const [fullName,setFullName] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');

    const navigation = useNavigation();

    function getSignInPage(){
        navigation.navigate('SignInPage')
    }

    function sendInfo(e){
        const information = {
            email: e,
            fullName: fullName
        }
        console.log(information)
        try{
        return fetch('http://192.168.2.17:5000/createNewUser',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(information)
        
        })
        .then((response)=>{
            response.json()
        })
        .then(data=>{
            console.log(data)
        })
        }catch(error){
            console.log(error)
        }
    }

    function hadnleSignUp(){

        if(email.includes('@mcmaster.ca')){
            createUserWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                sendInfo(res.user.email)
                console.log(res.user.email)
                navigation.navigate("LoginApp")
            }).then()
            .catch((err)=>{
                console.log(err.message)
            })
        }else{
            console.log("Not School Email")
        }

    }
   
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.text}>Welcome!</Text>

            <Input name='Mac-Email' setValue={setEmail} value={email}/>
            <Input name='Full Name' setValue={setFullName} value={fullName}/>
            <Input name='Password' isPassword={true} setValue={setPassword} value={password}/>
            <Input name='Confirm Password' isPassword={true} setValue={setPasswordConfirm} value={passwordConfirm}/>

            <Button title='Sign Up' action={hadnleSignUp}/>

            <Text style={styles.footer}>Already have an account? <Text style={styles.link} onPress={getSignInPage}>Log in</Text></Text>
        </KeyboardAvoidingView>
    )
}

export default SignUp

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
