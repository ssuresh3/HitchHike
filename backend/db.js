// Define a custome databse

const fs = require('fs');

// storing users in ram as array hashmap
var __users = [] 

// might want to store rides in k-d tree for efficient spacial searching
var __rides = []

// user object that will be stored in ran 
function User(fName, lName, email, DOB){
    this.userID = __users.length
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.DOB = DOB;
    this.rides = [];

    // add to __users array, implicitly this makes the index = userID
    __users.push(this)
}

// ride object
function Rides(userID, origin, destination, seats, time){
    this.rideID = __rides.length
    this.userID = userID
    this.origin = origin
    this.destination = destination
    this.max = seats
    this.departTime = time
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

    postRide: function(User, origin, destination, time){
        console.log("post a ride from x to y at time t")
    },

    deleteRide: function(User, rideID){
        console.log("cancel a ride given its ID")
    },

    updateRide: function(User, rideID){
        console.log("update a posted ride")
    },

    findRide: function(location, time){
        console.log("find all rides near me")
    },


}










