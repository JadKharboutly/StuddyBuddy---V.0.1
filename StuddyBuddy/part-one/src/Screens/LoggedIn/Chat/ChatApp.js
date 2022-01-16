import { StyleSheet, Text, View,TextInput, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView,Alert} from 'react-native';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import { auth } from '../../../../firebase'
import { useNavigation } from '@react-navigation/native';
const socket = io.connect("http://192.168.2.17:5001");

const KeyboardAvoidWrapper = ({children}) => {

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          {children}

        </TouchableWithoutFeedback>
        
    </KeyboardAvoidingView>
  )
}

export default function ChatApp() {

  const [username, setUsername] = useState ("");
  const [room, setRoom] = useState ("");
  const [showChat, setShowChat] = useState(false);

  const navigation = useNavigation();

  const createTwoButtonAlert = () =>
  Alert.alert(
    "Unauthorized",
    "You Haven't Paired With A buddy",
    [
      { text: "OK", onPress: () => {navigation.navigate("Home")} }
    ]
  );

  async function EnterChat(e){

    try{
         const response = await fetch('http://192.168.2.17:5000/userInfo',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:e})
        })
        const data = await response.json()

        if (data.fullName !== "" && data.chatId !== ""){
            socket.emit("join_room", data.chatId);
            setShowChat(true);
        }else{
            createTwoButtonAlert()
        }

        setUsername(data.fullName)
        setRoom(data.chatId)


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


  const joinRoom = () => {
    // if (username !== "" && room !== ""){
    //     socket.emit("join_room", room);
    //     setShowChat(true);
    // }
    EnterChat(auth.currentUser.email)
    removeChatId(auth.currentUser.email)
  };

  return (
    <KeyboardAvoidWrapper>
    <View style={styles.container}>
         { showChat === false &&  <> 
         <View style={styles.container_TWO}>
            <Button title={`Join The Chat Room ${'\n'} With Your Buddy`} onPress={joinRoom} /> 
            

         </View>
          </>}
          { showChat === true &&  <> 
          <Chat socket={socket} username={username} room={room} setShowChat={setShowChat} clearRoom={setRoom}/> 
          </>}      
      </View>  
   </KeyboardAvoidWrapper>  
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDDBDB',
    justifyContent:'center'
  },

});
