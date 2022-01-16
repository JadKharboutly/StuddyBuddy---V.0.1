import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {useState,useEffect} from 'react';
import { auth } from '../../firebase';
import Buddy from './Buddy';
import uuid from 'react-native-uuid'
import { async } from '@firebase/util';

const FindBuddy = () => {

    const [courseCode,setCourseCode] = useState('');
    const [codePresent,setCodePresent] = useState(false)
    const [info,setInfo] = useState({});
    const [buddyStatus,setBuddyStatus] = useState(false)
    const [buddyData,setBuddyData] = useState({});
    const [chatId,setChatId] = useState('');

    async function findBuddy(email,courseCode){
        try{
            const response = await fetch('http://192.168.2.17:5000/find-me-a-buddy',{
               method: 'POST',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({email:email ,courseCode:courseCode})
           })
           const data = await response.json();
        //    console.log(data.found)
           setBuddyData(data)
        //    console.log(data.buddy.fullName)
           if(data.buddyFound === 'true'){
               console.log("found")
               setChatId(uuid.v4())
               setBuddyStatus(true)
           }
        //    console.log(data)
           
           }catch(error){
               console.log(error)
           }
    }

    async function sendCourseCode(email,courseCode,present){
        try{
            const response = await fetch('http://192.168.2.17:5000/set-course-code',{
               method: 'POST',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({email:email ,courseCode:courseCode})
           })
           const data = await response.json();
        //    console.log(data)
           setInfo(data)
           setCodePresent(present)
           setCourseCode('')

        }catch(error){
               console.log(error)
           }
    }

    async function setBuddyStat(email,stat){
        try{
            const response = await fetch('http://192.168.2.17:5000/update-status',{
               method: 'POST',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({email:email ,buddyFound:stat})
           })

        }catch(error){
               console.log(error)
           }
    }

    async function removeChatId(email){
        try{
            const response = await fetch('http://192.168.2.17:5000/removeChatId',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email})
            })
            const data = await response.json();
         //    console.log(data)
 
        }catch(err){
            console.log(err)
        }
    }


    async function handleFindBuddy(){
        sendCourseCode(auth.currentUser.email,courseCode,true);
        findBuddy(auth.currentUser.email,courseCode); // if buddy found initially
        removeChatId(auth.currentUser.email)

    }

    async function cancelButton(){
        sendCourseCode(auth.currentUser.email,'',false);
        setBuddyStat(auth.currentUser.email,false)
        removeChatId(auth.currentUser.email)

    }



    return (
       <>
        { !buddyStatus && <View style={styles.container}>
            <Text style={styles.title}>Find a Studdy Buddy</Text>
            <KeyboardAvoidingView style={styles.container_TWO}>
                <View style={styles.titles}>
                <Text style={styles.text}>Class Code:</Text>
                {codePresent && !buddyStatus && <Text style={styles.text}>Looking for buddy in:</Text>}
                </View>
                <View style={styles.boxes}>
                <TextInput placeholder='ex: 2XC3' style={styles.input} value={courseCode} onChangeText={text=>{setCourseCode(text)}}/>
                {codePresent && !buddyStatus && <Pressable onPress={cancelButton} style={styles.cancelBox}><Text>{info.courseCode}</Text></Pressable>}
                </View>
            </KeyboardAvoidingView>
            <View style={styles.container_THREE}>
                <Pressable style={styles.button} onPress={handleFindBuddy}>
                    <Text style={styles.buttonText}>
                    Find me a Buddy!
                    </Text>
                </Pressable>
                </View>
        </View>}
        {buddyStatus && <Buddy id={chatId} buddyEmail={buddyData.email} remove={setBuddyStatus} buddyName={buddyData.fullName}/>}
        </>
    )
}

export default FindBuddy

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E1EAF8',
        width:340,
        height:190,
        borderRadius:5
    },
    container_TWO:{
        marginLeft: 20,
        // height:50,
        // width:140,
        marginTop:10,
        // backgroundColor:'red',
    },
    title:{
        fontSize:23,
        fontWeight:'bold',
        color:"#2E3138",
        marginTop:12,
        marginLeft: 12 
    },
    input:{
        backgroundColor:'white',
        height:40,
        width:100,
        borderRadius:10,
        paddingLeft: 10,
        marginRight:70
    },
    text:{
        marginBottom:5,
        fontSize:15,
        color:"#2E3138",

    },
    button:{
        width:160,
        height:40,
        backgroundColor:'#4E6DB6',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:14,
        color:'#E1EAF8',
        fontWeight:'bold',
    },
    container_THREE:{
        alignItems:'center',
        marginTop:'8%'
        
    },
    boxes:{
        // backgroundColor:'blue',
        height:40,
        left:0,
        flexDirection:'row'        
    },
    cancelBox:{
        backgroundColor:'rgb(255,204,203)',
        height:40,
        width:120,
        borderRadius:10,
        paddingLeft: 10,
        marginRight:70,
        justifyContent:'center'    
    },
    titles:{
        // backgroundColor:'blue',
        flexDirection:'row',
        marginRight:20,
        justifyContent:'space-between'
    }
})