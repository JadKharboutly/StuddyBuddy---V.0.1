const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    courseCode: String,
    buddyFound: String,
    chatId:String,
    latitude:String,
    longitude:String,
    
    
})

const m = mongoose.model("Users",userSchema);
module.exports = m;