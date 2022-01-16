import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text,StyleSheet, Pressable } from 'react-native'

const FindGroup = () => {
    const navigation = useNavigation()
    function handleMap(){
    navigation.navigate('Map')  
    }
    return (
        <Pressable onPress={handleMap} style={styles.container}>
            <Text style={styles.title}>Find a Study Group</Text>
        </Pressable>
    )
}

export default FindGroup

const styles = StyleSheet.create({
    container:{
        marginTop:'15%',
        backgroundColor: '#C4C4C4',
        width:340,
        height:80,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize: 24,
        fontWeight:'bold',
        color:'#2E3138'
    }
})