import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import Loading from './Loading';
import { auth } from '../../firebase';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './LoggedIn/Routes';
export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locationsList, setLocationsList] = useState([]);
  const [id,setId] = useState('')
  const [pin, setPin] = useState({
    latitude: 43.89706,
    longitude: -79.355163,
  })

  async function getList(s){
    try{
        const response = await fetch('http://192.168.2.17:5000/getLocations',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({set:s})
        })
        const data = await response.json();
        const list = data.locations.filter(node=>node.email!==auth.currentUser.email);
        
        console.log(list)
        setLocationsList(list)

        return data

    }catch(err){
        console.log(err)
        console.log("no")
    }
}

    useFocusEffect(
        React.useCallback(() => {
            getList('true')
        },[]))

        useEffect(()=>{
          getList('true')
        },[id])
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      setLongitude(longitude);
      setLatitude(latitude);
      console.log(latitude, longitude)

    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const navigation = useNavigation();
  
  function handleRefresh(){
    setId(uuid.v4())
  }

  return (
    <View key={id} style={styles.container}>
      <SafeAreaView style={styles.header}>
      <Text onPress={handleRefresh} style={styles.refresh}>&#8635;</Text>

      </SafeAreaView>
      {latitude !== 0 ? <MapView
        userInterfaceStyle={'dark'}
        showsUserLocation
        showsMyLocationButton
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          
             {/* <Marker 
              coordinate={{
                latitude: 43.2691998,
                longitude: -79.9533713
              }}
              pinColor='blue'>
                <Callout style={styles.callout}>
                  <Text style={styles.callout_nametag}>Emil Soleymani</Text>
                  <Text style={styles.callout_coursecode}>2FA3 Discrete Maths II</Text>
                </Callout>
              </Marker> */}

            <Marker 
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
              }}
              pinColor='black'>
                <Callout style={styles.callout}>
                  <Text style={styles.callout_nametag}>Emil Soleymani</Text>
                  <Text style={styles.callout_coursecode}>2FA3 Discrete Maths II</Text>
                </Callout>
              </Marker>
              <Circle
                center={pin}
                radius={1000}
                />
            {locationsList.map(location=>{

               return(
                    
                    <Marker 
                    key={uuid.v4()}
              coordinate={{
                latitude: location.location.latitude,
                longitude: location.location.longitude
              }}
              pinColor='orange'>
                <Callout style={styles.callout}>
                  <Text style={styles.callout_nametag}>Emil Soleymani</Text>
                  <Text style={styles.callout_coursecode}>2FA3 Discrete Maths II</Text>
                </Callout>
              </Marker>
              
                )
            })}

              <Marker 
              coordinate={pin}
              pinColor='red'
              draggable={true}
              onDragStart={(e) => {
                console.log("Drag start: ", e.nativeEvent.coordinate)
              }}
              onDragEnd={(e) => {
                console.log("Drag End: ", e.nativeEvent.coordinate)
                setPin(e.nativeEvent.coordinate)
              }}></Marker>
        </MapView> : <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDDBDB',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: "100%",
    margin: 0,
  },
  callout_nametag: {
      backgroundColor: "#f4f4f4",
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 10,
      borderRadius: 10,
      justifyContent: 'center',
      fontWeight: "bold"
  },
  callout_coursecode: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 3,
    backgroundColor: "white",
    justifyContent: 'center',
  },
  header:{

    // backgroundColor:'red',
    height:70,
    width:'100%',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    paddingRight:10,
  },
  refresh:{
    // backgroundColor:'blue',
    fontSize:30,
    position:'absolute',
    paddingRight:20,
    paddingBottom:5,
    color:'black',
    fontWeight:'bold'
    
  }
});

