// Define a custome databse

const fs = require('fs');

// storing users in ram as array hashmap
var __users = [] 

// might want to store rides in k-d tree for efficient spacial searching
var __rides = []

// user object that will be stored in ran 
function User(fName, lName, email, DOB){
    var User = {
        userID: __users.length,
        fName: fName,
        lName:lName,
        email: email,
        DOB: DOB,
        rides:[]
    } 

    // add to __users array, implicitly this makes the index = userID
    __users.push(User)

    return User
}

// ride object
function Rides(userID, origin, destination, seats, time){
    var Ride = {
        rideID: __rides.length,
        userID: userID,
        origin: origin,
        destination: destination,
        maxSeats: seats,
        departTime: time
    }

    __rides.push(Ride)

    return Ride
}

// every time a new user signs up, write to file
function write_to_file(user_obj){
    json_obj = JSON.stringify(user_obj)

    fs.appendFile('backup.json', json_obj, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

// read user from file
/*function read_from_file(userID){
    var data = JSON.parse(backup.json);

    for (var i=0 ; i < data.length ; i++){
        
        // find User from userID
        if (){ 
        }
    }
}*/

// public functions availiable to index.js
module.exports = {

    hello: function (){
        console.log("hello")
    },

    newUser: function(fName, lName, email, DOB){
        console.log("creating new user")
        user = User(fName, lName, email, DOB)

        // write user to backup file
        write_to_file(user)
        console.log(user)
    },

    getUser: function(userID){
        console.log("get user")
    },

    updateUser: function(userID){
        console.log("update user")
    },

    deleteUser: function(userID){
        console.log("remove user")
    },

    postRide: function(userID, origin, destination, time){
        console.log("post a ride from x to y at time t")
    },

    deleteRide: function(userID, rideID){
        console.log("cancel a ride given its ID")
    },

    updateRide: function(userID, rideID){
        console.log("update a posted ride")
    },

    findRide: function(userID, location, time){
        console.log("find all rides near me")
    },


}










