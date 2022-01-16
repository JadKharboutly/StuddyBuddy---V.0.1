const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    Map:String,
    locations:[]
    
})

const m = mongoose.model("locations",locationSchema);
module.exports = m;