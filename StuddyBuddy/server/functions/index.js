// const functions = require("firebase-functions");
const MongoClient = require("mongodb").MongoClient;
// const client = new MongoClient('mongodb+srv://JadKhar:MOONjado203@cluster0.ofd59.mongodb.net/studdyBuddy?retryWrites=true&w=majority');
// const dbName = 'StuddyBuddy';
// const collectionName = "Users";

exports.snedNotification = function snedNotification( req, res) {
  const uri = "mongodb+srv://JadKhar:MOONjado203@cluster0.ofd59.mongodb.net/studdyBuddy?retryWrites=true&w=majority";
  MongoClient.connect(uri, ( err, db)=>{
    console.log(db);
  });
};
