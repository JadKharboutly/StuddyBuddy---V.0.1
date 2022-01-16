import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,KeyboardAwareScrollView, Keyboard, StyleSheet, Pressable, SafeAreaView,TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, FlatList, SectionList } from 'react-native';
import {useState, useEffect,useRef} from 'react';
// import ScrollToBottom from 'react-scroll-to-bottom';
import uuid from 'react-native-uuid';


function Chat({ socket, username, room, setShowChat,clearRoom}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userLeft, setUserLeft] = useState(false);


    const sendMessage = async () => {
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [messageData,...list]);
            setCurrentMessage("");
        } 
    };

    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [data,...list]);
        });

        socket.on("connection_left", () => {
            console.log("here")
            setUserLeft(true);
        });

    }, [socket])

    const leaveRoom = () => {
        socket.emit("leave_room", room);
        setShowChat(false);
        clearRoom('');
    };

    useEffect(() => {
        console.log(messageList)
    }, [messageList])
    useEffect(() => {
        console.log(messageList)
    }, [])
    

    const renderItem = ({item})=>{
     
        if(username !== item.item.author)
            return(
                <View style={{marginBottom:5}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginLeft:5,fontSize:12}}>{item.item.time}</Text>
            <View style={styles.messageContainer}>
                <Text >{item.item.message}</Text>
            </View>
            </View>
            <Text style={{marginLeft:'13%',fontSize:12}}>{item.item.author}</Text>
            </View>
            )
        else{
            return(
            <View style={{alignItems:'flex-end',marginBottom:5}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
        <View style={styles.messageContainer_YOU}>
            <Text style={{color:'white'}}>{item.item.message}</Text>
          
        </View>
        <Text style={{marginRight:5,fontSize:12}}>{item.item.time}</Text>
        </View>
        <Text style={{marginRight:'13%',fontSize:12}}>{item.item.author}</Text>
        </View>
            )
        }
    }

    return (

        <View style={styles.container}>

            <View style={styles.header}>
               <Text style={styles.title}>Live Chat</Text> 
               <Pressable style={styles.leaveButton}onPress={leaveRoom} >
                   <Text style={{color:'white'}}>Leave</Text>
                   </Pressable> 
            </View>

            <FlatList scrollsToTop={true} style={styles.list} inverted={true} data={messageList} keyExtractor={()=>uuid.v4()} renderItem={(item)=>(
                    renderItem({item})
            )}/>
                        {userLeft === true &&
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontWeight:'bold',marginBottom:'5%'}}>Your Buddy Left The Chat</Text>
                                </View>
                                }
            <KeyboardAvoidingView style={styles.sendContainer}>
                <TextInput style={styles.input} value={currentMessage} placeholder="Send Message" onChangeText={setCurrentMessage}/>
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>&#8593;</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    // justifyContent: "space-between",
    backgroundColor: '#EDDBDB',
  },
  list:{
    //   backgroundColor:'red',
    
  },
  leaveButton:{
      backgroundColor:'#4E6DB6',
      padding:5,
      paddingHorizontal:10,
      borderRadius:15,
      position:'absolute',
      right:'5%',
      bottom:10
  },
  header:{
    backgroundColor:'white',
    width:'100%',
    height:80,
    alignItems:'center',
    justifyContent:'flex-end',
  },
  title:{
    marginBottom:10,
    fontSize:18,
    fontWeight:'bold'
  },
  container_messages:{
      flex:1,
      marginBottom:10,
      
  },
  message:{ 
    //   backgroundColor:'red',
      marginVertical:5,
      alignItems:'baseline',
      justifyContent:'center',

  },
  message_YOU:{
    // backgroundColor:'green',
    marginVertical:5,
    alignItems:'flex-end',
    justifyContent:'center',
  },

  messageContent:{
      alignItems:'center',
      justifyContent:'center',
      width:'auto',
      backgroundColor:'white',
      borderRadius: 5,
      minHeight:30,
      padding:3,
      marginLeft:'5%',
      paddingHorizontal:10,
      maxWidth:250
  },

  messageContent_YOU:{
    alignItems:'center',
    justifyContent:'center',
    width:'auto',
    backgroundColor:'#4E6DB6',
    borderRadius: 5,
    minHeight:30,
    padding:3,
    marginRight:'5%',
    paddingHorizontal:10,
    maxWidth: 250
},
  message_container:{
    //   backgroundColor:'blue',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      marginLeft:'2%',
      marginRight:'2%'

  },
  input:{
    // backgroundColor:'red',
    height:40,
    width:'80%',
    borderRadius:100,
    paddingLeft:10,

  },
  sendContainer:{
      backgroundColor:'white',
      flexDirection:'row',
      borderRadius:0,
      borderTopRightRadius:50,
      borderBottomRightRadius:50

  },
  sendButton:{
      backgroundColor:'#4E6DB6',
      width:'20%',
      borderRadius:100,
      justifyContent:'center',
      alignItems:'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  
  tinyLogo: {
    width: 50,
    height: 50,
  },
  messageContainer:{
    
      backgroundColor:'white',
      marginVertical:5,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'flex-start',
      padding:5,
      paddingHorizontal:8,
      borderRadius:5,
      marginHorizontal:5

  },
  messageContainer_YOU:{
    
    backgroundColor:'#4E6DB6',
    marginVertical:5,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'flex-start',
    padding:5,
    paddingHorizontal:8,
    borderRadius:5,
    marginHorizontal:5,

},
  

});


export default Chat

