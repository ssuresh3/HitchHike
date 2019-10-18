// Define a custome databse

const fs = require('fs');

// storing users in ram as array hashmap
var __users = [] 

// might want to store rides in k-d tree for efficient spacial searching
var __rides = []

// user object that will be stored in ran 
function User(fName, lName, email, DOB){
    this.userID = __users.length;
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
    this.rideID = __rides.length;
    this.userID = userID;
    this.origin = origin;
    this.destination = destination;
    this.maxSeats = seats;
    this.departTime = time;

    __rides.push(this)
}

// every time a new user signs up, write to file
function write_to_file(user_obj){
    json_obj = JSON.stringify(user_obj)

    fs.readFile('backup.json', 'utf-8', function(err, data) {
        if (err) throw err

        var backup = JSON.parse(data)
        backup.users.push(user_obj)

        fs.writeFile("backup.json", JSON.stringify(backup), function(err){
            if (err) throw err;
        });

        console.log(backup)
    })
}

// read user from file
function read_from_file(userID){
    var text = fs.readFileSync('backup.json')
    var file = JSON.parse(text)

    for (var i=0; i<file['users'].length; i++){
        if (file['users'][i]['userID'] == userID){
            console.log("found userID")
            return file['users'][i]
        }
    }
}

// public functions availiable to index.js
module.exports = {

    hello: function (){
        console.log("hello")
    },

    newUser: function(fName, lName, email, DOB){
        console.log("creating new user")
        var user = new User(fName, lName, email, DOB)

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

    testRead: function(userID){
        read_from_file(userID)
    },


}










