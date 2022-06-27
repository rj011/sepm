const express = require("express");
const res = require("express/lib/response");
const { json }= require("express/lib/response");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require('mongoose');
const { GridFSBucketWriteStream } = require("mongodb");
mongoose.connect('mongodb://localhost:27017/patientsDb');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Cannot be added without a name"]
    },
    patientid: {
        type: Number,
        required: [true, "Patient id is needed"]
    },
    age: Number,
    Address: String
    
});
const Record = mongoose.model("Record",patientSchema);

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Organisation name is mandatory"]
    },
    companyid: {
        type: Number,
        required: [true, "Company id is mandatory"]
    },
    access : patientSchema
});


const patient1 = new Record({
    name: "Jane Doe",
    patientid: 002,
    age: 45,
    Address: "Classified"
});
const patient2 = new Record({
    name: "xYZ",
    patientid: 980,
    age: 12,
    Address: "45/2 VijayNagar, New Delhi"
});

const patient3 = new Record({
    name: "John Doe",
    patientid: 000,
    age: 45,
    Address: "Classified"
});
//patient3.save();

const User = mongoose.model("User",orgSchema);

const org1 = new User({
    name: "ABC Corp.",
    companyid: 1234,
    access: patient3
});
//org1.save();
const org2 = new User({
    name: "DEF Corp.",
    companyid: 5678,
    access: patient2
});
const org3 = new User({
    name: "XYZ Corp.",
    companyid: 0000,
    access: patient1
});
//org2.save();
//org3.save();


app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
});




Record.find(function(err,records){
    if(err){
        console.log("Error");

    }
    else{
        
        
        
        records.forEach(function(dataentry){
            console.log(dataentry.name);
        })
    }
});

User.find(function(err,users){
    if(err){
        console.log("Error");

    }
    else{      
                
        users.forEach(function(username){
            console.log(username.name);
            mongoose.connection.close();
        })
    }
});

User.deleteOne({name: "DEF Corp."},function(err){
    if(err){
        console.log("Something Went Wrong");
    }
    else{
        console.log("Deleted record successfully");
    }
});

app.listen(process.env.PORT || 3000, function(req,res)
{
    console.log("Server started");
});


/*User.insertOne(org1,function(err){
    if(err)
    {
        console.log("couldnt insert user");
    }
    else{
        console.log("User entered successfully");
    }
});*/
/*Record.insertMany([patient1,patient2], function(err)
{
    if(err){
        console.log("Something went wrong");

    }
    else
    {
        console.log("Data entry was successful");
    }
});*/
/*Record.updateOne({_id: "62b2cdab32c25de2edbb5677"}, {name : "Rajesh Babu"}, function(err){
    if(err){
        console.log("Something went wrong");
    }
    else{
        console.log("Successfully updated document");
    }
});*/
/*Record.deleteOne({name: "John Doe"},function(err){
    if(err){
        console.log("Something Went Wrong");
    }
    else{
        console.log("Deleted record successfully");
    }
});*/
/*User.deleteOne({name: "ABC Corp."},function(err){
    if(err){
        console.log("Something Went Wrong");
    }
    else{
        console.log("Deleted record successfully");
    }
});*/

/*Record.find(function(err,records){
    if(err){
        console.log("Error");

    }
    else{
        mongoose.connection.close();
        
        
        records.forEach(function(dataentry){
            console.log(dataentry.name);
        })
    }
});*/


