import React from 'react'
import { View, Text,StyleSheet,Pressable } from 'react-native'

const Button = ({action,title,location}) => {
    return (
        <Pressable style={[styles.container, styles[`container_${location}`]]} onPress={action}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#4E6DB6',
        width:270,
        height:35,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 30

    },
    container_LandingPage:{
        width:140,
        height:40
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        color: '#EDDBDB',

    }
})