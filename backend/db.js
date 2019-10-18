// Define a custome databse

const fs = require('fs');

// storing users in ram as array hashmap
var __users = [] 

// might want to store rides in k-d tree for efficient spacial searching
var __rides = []

// user object that will be stored in ran 
function User(fName, lName, email, DOB, seats){
    this.userID = __users.length
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.DOB = DOB;
    this.rides = [];
    this.numSeats = seats;

    // add to __users array, implicitly this makes the index = userID
    __users.push(this)
}

// ride object
function Rides(User, origin, destination, seats, time){
    this.rideID = __rides.length
    this.User = User
    this.origin = origin
    this.destination = destination
    this.cap = seats
    this.time = time
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
function read_from_file(userID){
    var data = JSON.parse(backup.json);

    for (var i=0 ; i < data.length ; i++){
        
        // find User from userID
        if (){
            // 
        }
    }
}

// public functions availiable to index.js
module.exports = {

    hello: function (){
        console.log("hello")
    },

    getUser: function(userID){
        console.log("get user")
    }

    newUser: function(user_obj){
        console.log("create new user")
    }

    updateUser: function(userID){
        console.log("update user")
    }

    deleteUser: function(userID){
        console.log("remove user")
    }

    postRide: function(User, origin, destination, time){
        console.log("post a ride from x to y at time t")
    }

    deleteRide: function(User, rideID){
        console.log("cancel a ride given its ID")
    }

    updateRide: function(User, rideID){
        console.log("update a posted ride")
    }

    findRide: function(location, time){
        console.log("find all rides near me")
    }


}










