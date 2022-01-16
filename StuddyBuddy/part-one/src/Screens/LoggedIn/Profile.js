import React from 'react'
import { View, Text, StyleSheet, Switch,Pressable,TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useEffect,useState} from 'react'

//Nav
import { useFocusEffect, useNavigation } from '@react-navigation/native'

//FireBase
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'

//Components
import Button from '../../Components/Button'
// import { TextInput } from 'react-native-gesture-handler'
import * as Location from 'expo-location';


const Profile = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [courseCode,setCourseCode] = useState('');
    const [info,setInfo] = useState({});



    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation();

    function hadndleSignOut(){
        signOut(auth)
        .then(()=>{
            navigation.navigate("LandingPage")
        })
    }

    async function handleLocation(email,location,s){
        try{
            const response = await fetch('http://192.168.2.17:5000/setLocation',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email , location:location, set:s})
            })
            const data = await response.json();
            // console.log(data)
    
        }catch(err){
            console.log(err)
        }
    }

   async function getInfo(email){
        try{
            const response = await fetch('http://192.168.2.17:5000/userInfo',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email})
            })
            const data = await response.json();
            setInfo(data)
            // console.log(data)
    
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getInfo(auth.currentUser.email)
        console.log(info)
        console.log("gotten")
    },[])

    const getLocation = async (set) => {
        try{
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            // console.log(location);
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
    
            const loc = {latitude:latitude,longitude:longitude}
    
            handleLocation(auth.currentUser.email,loc,set)
    
            return loc
        }catch(err){
            console.log(err)
        }
      
    }

    useEffect(() => {
        if(isEnabled === false){ // GHOST MODE OFF
            getLocation(true)
            
        }else{
            getLocation(false)

        }

    }, [isEnabled])
    

    async function handleCourseCode (email,info,s){
         
        const information= {
            message:'',
            author:''
        }

        try{
            const response = await fetch('http://192.168.2.17:5000/setLocation',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email , info:information, set:s})
            })
            const data = await response.json();
            // console.log(data)
    
        }catch(err){
            console.log(err)
        }
    }
    
    
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{`Settings`}</Text>

            <View style={styles.mapSection}>
                <Text style={styles.header}>Map</Text>
            <View style={styles.container_THREE}>
            <Text style={{marginHorizontal:10,fontSize:15,fontWeight:'bold'}}>{`Ghost Mode: ${isEnabled === false ? 'OFF':'ON'}`}</Text>

            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{marginRight:'5%'}}
            />
            </View>

            <View style={styles.container_FOUR}>
            <Text style={{marginHorizontal:10,fontSize:15,fontWeight:'bold'}}>{`Course Code To Display on Map: `}</Text>

            <TextInput value={courseCode} style={styles.courseCodeInput} placeholder='ex;2XC3' onChangeText={setCourseCode}/>
            <Pressable style={styles.confirm} onPress={handleCourseCode}>
                <Text style={{color:'white',fontWeight:'bold'}}>
                &#10003;
                </Text>
            </Pressable>            
            </View>
            <View style={styles.PersonalInfo}>
                <Text style={styles.header}>Personal Info</Text>
                <View style={styles.email}>
            <Text style={{marginHorizontal:10,fontSize:15,fontWeight:'bold'}}>{`Email: `}</Text>

            <View value={courseCode} style={styles.emailBox} placeholder='ex;2XC3' onChangeText={setCourseCode}>
                <Text>
                    {auth.currentUser.email}
                </Text>
                </View>
            </View>

            <View style={styles.email}>
            <Text style={{marginHorizontal:10,fontSize:15,fontWeight:'bold'}}>{`Name: `}</Text>

            <View value={courseCode} style={styles.emailBox} placeholder='ex;2XC3' onChangeText={setCourseCode}>
                <Text>
                    {info?.fullName}
                </Text>
                </View>
                </View>
            </View>

         

            <View style={styles.container_TWO}>
            <Button title='Sign Out' action={hadndleSignOut}/>
            </View>
            </View>

        </SafeAreaView>

    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#EDDBDB',
        paddingTop:40,
        
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        marginLeft:10,
        color:"#2E3138"
    },
    container_TWO:{
        // marginTop:'142%',
        justifyContent:'center',
        alignItems:'center',
    },
    container_THREE:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    container_FOUR:{
        marginTop: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:35
        
    },
    courseCodeInput:{
        backgroundColor:'white',
        height:'100%',
        width:90,
        borderRadius:7,
        padding:5,
        marginRight:'1%'
    },
    header:{
        fontSize:24,
        fontWeight:'bold',
        marginHorizontal:10,
        marginBottom:10
    },
    mapSection:{
        marginTop:'10%'
    },
    confirm:{
        backgroundColor:'#4E6DB6',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        width:30,
        borderRadius:7,
        marginRight:4

    },
    PersonalInfo:{
        // backgroundColor:'red'
    },
    email:{
        // backgroundColor:'blue',
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
        
    },
    emailBox:{
        backgroundColor:'white',
        height:'100%',
        alignSelf:'center',
        borderRadius:7,

        padding: 11,
        marginRight:'1%',
        justifyContent:'center',
        alignItems:'center'
    }
})