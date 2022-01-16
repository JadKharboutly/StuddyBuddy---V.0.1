import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})