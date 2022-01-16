import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebase'

import uuid from 'react-native-uuid'
import { async } from '@firebase/util'
const Buddy = ({buddyName,remove,buddyEmail,id}) => {

    const navigation = useNavigation();

    function handleExit(){
        setChatId(auth.currentUser.email,buddyEmail,'')

        navigation.navigate('Home')
        remove(false)
    }

    async function setChatId(email,buddyEmail,id){
        try{
            const response = await fetch('http://192.168.2.17:5000/pair',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email ,id:id, buddyEmail:buddyEmail})
            })
            const data = await response.json();
         //    console.log(data)
 
        }catch(err){
            console.log(err)
        }
    }

    async function handlePairing(){
        setChatId(auth.currentUser.email,buddyEmail,id)
        navigation.navigate('Chat')
        remove(false)


    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container_TWO}>
            <Pressable onPress={handleExit} style={{position:'absolute',top:10,right:10,padding:5,borderRadius:20,width:30,height:30,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:15,fontWeight:'bold'}}>&#10005;</Text></Pressable>
                <Text style={styles.title}>{`Study Buddy \n Found!`}</Text>
                <View style={styles.nameContainer}>
                <Text style={{fontWeight:'bold',fontSize:14}}>Name: </Text>
                <Pressable style={styles.name}><Text style={{fontSize:15}}>{buddyName}</Text></Pressable>
                </View>
                <Pressable onPress={handlePairing} style={styles.button}>
                <Text style={{fontSize:14,fontWeight:'bold',color:'white'}}>
                    Pair
                </Text>
            </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Buddy

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    container_TWO:{
        height:330,
        width:270,
        backgroundColor:'#E1EAF8',
        borderRadius:5,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    nameContainer:{
        flexDirection:'row',
        // backgroundColor:'lightblue',
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        backgroundColor:'white',
        padding:5,
        height:30,
        width:165,
        borderRadius:10,
        alignItems:'center',

    },
    button:{
        width:175,
        height:35,
        backgroundColor:'#4E6DB6',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        
    }
})