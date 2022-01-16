const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Users = require('./models/users');
const Locations = require('./models/locations');
const bodyParser = require('body-parser');
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io")
const server = http.createServer(app);

const port = 5000;
const port_Chat = 5001;
app.use(cors());
app.use(bodyParser.json())


var database = 'mongodb+srv://JadKhar:MOONjado203@cluster0.ofd59.mongodb.net/studdyBuddy?retryWrites=true&w=majority'
mongoose.connect(database);

const addLocation = async(e,location,set)=>{
    if(set === true){ // To Add
        const locations = await Locations.findOne({Map:'true'})
        locations.locations.push({email:e,location:location})
        await locations.save();
        console.log(locations.locations)
        return locations
    }else{ // To Remove
        const locations = await Locations.findOne({Map:'true'})
        const list = locations.locations.filter(node => node.email !== e)
        console.log(list)
        locations.locations = list;
        await locations.save();
        return locations
    }

}
// addLocation('Amena',{longitude:-79.9214141, latitude:43.260879 },{author:'jado',message:'teeekjagfd'},true)




const getLocations = async(s) => {
    const locations = await Locations.findOne({Map:s})
    return(locations)
}

const setUser = async(e,f)=>{
    const user = await Users.create({email:e,fullName:f,buddyFound:false,courseCode:'',chatId:'',latitude:'',longitude:''})
}




const getUser = async(e) =>{
    const user = await Users.findOne({email:e})
    return user
}

const setFoundBuddy = async(e,s)=>{
    var user = await Users.findOne({email:e})
    user.buddyFound = s,
    await user.save()
    console.log(user)
    return user
}

const setCode = async(e,c) =>{
    var user = await Users.findOne({email:e})
    user.courseCode = c;
    await user.save()
    return user
}

const findBuddy = async(e,c)=>{

    try{
        var buddy = await Users.findOne({courseCode:c});

        if(buddy.email !== e){
            await setFoundBuddy(e,true)
            buddy.buddyFound = true;
            await buddy.save()

            return buddy
        }
    }catch(err){

        return setFoundBuddy(e,false)
    }

}

const setChatId = async(id,e,buddyEmail) =>{
    var user = await Users.findOne({email:e})
    var buddy = await Users.findOne({email:buddyEmail})
    user.chatId = id
    buddy.chatId = id
    await user.save()
    await buddy.save()

    return {paired:'true'}

}

const removeChatId = async(e) =>{
    var user = await Users.findOne({email:e})
    user.chatId = ''
    await user.save()

    return {paired:'true'}
}

const setLocation = async (e,location,set) =>{
    var user = await Users.findOne({email:e})
    if(set === true){
        user.latitude = location.latitude
        user.longitude = location.longitude
        await user.save();
        return user
    }else{
        user.latitude = ''
        user.longitude = ''
        await user.save();
        return user
    }

}
app.post('/setLocation',(req,res)=>{
    addLocation(req.body.email,req.body.location,req.body.set).then((response)=>{
        console.log(req.body)
        res.json(response)
        console.log(response)
    })
})

app.post('/getLocations',(req,res)=>{
    getLocations(req.body.set).then(response=>{
        res.json(response)
    })
})

app.post('/createNewUser',(req,res)=>{
    setUser(req.body.email,req.body.fullName)
})

app.post('/userInfo',(req,res)=>{
    getUser(req.body.email).then((response)=>{
        res.json(response)
    })
})

app.post('/set-course-code',(req,res)=>{
    setCode(req.body.email,req.body.courseCode).then((response)=>{
        res.json(response)
    })
})

app.post('/find-me-a-buddy',(req,res)=>{
    findBuddy(req.body.email,req.body.courseCode).then((response)=>{
        res.json(response)
    })
})

app.post('/update-status',(req,res)=>{
    setFoundBuddy(req.body.email,req.body.buddyFound).then((response)=>{
        res.json(response)
    })
})

app.post('/pair',(req,res)=>{
    setChatId(req.body.id,req.body.email,req.body.buddyEmail).then((response)=>{
        console.log(req.body)
        res.json(response)
    })
})

app.post('/removeChatId',(req,res)=>{
    removeChatId(req.body.email).then((response)=>{
        res.json(response)
    })
})
app.listen(port)

//CHAT


const io = new Server ( server, {
    cors: {
        origin: "http://localhost:19002",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });

    socket.on("join_room", (data) => {
    socket.join(data);

    console.log(`User with ID: ${socket.id} joined room: ${data}`)
    });

    socket.on("leave_room", (data) => {
    console.log("disconnecting.. ", socket.id)
    socket.leave(data);
    io.sockets.in(data).emit(socket.to(data).emit("connection_left"));  
    });

    socket.on("send_message", (data) => {
       socket.to(data.room).emit("receive_message", data);
    });

});

server.listen(port_Chat, () =>{
    console.log("Server Running on port " + port_Chat)
});