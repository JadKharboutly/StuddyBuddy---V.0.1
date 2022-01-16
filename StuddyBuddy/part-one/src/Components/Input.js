import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const Input = (props) => {

    const {
        name,
        setValue,
        v,
        isPassword = false,
        isEmpty
    } = props
    return (
        <View style={[styles.container, isEmpty === true ? styles[`container_error`]:{}]}>
            <TextInput placeholder={name} secureTextEntry={isPassword} onChangeText={setValue}/>
        </View>
    )
}
// console.log(value)
export default Input

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        backgroundColor: '#F3E9E9',
        width:270,
        height:40,
        borderRadius:6,
        borderColor:'#EBDFDF',
        borderWidth:2,
        paddingLeft:10,
        marginBottom:8,
        
    },
    container_error:{
        borderColor:'red'
    }


})