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

// find user in __users
function findUser(userID){
    try{ return __users[userID] }
    catch(e){
        console.log(e)
    }
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

// read users from file
function readBackup(userID){
    console.log("Warning: we are either filling __users or overriding __users from disk")
    
    var text = fs.readFileSync('backup.json')
    var file = JSON.parse(text)

    for (var i=0; i<file['users'].length; i++){
        
        // seach for single user
        if (userID >= 0){ 
            if (file['users'][i]['userID'] == userID){
                console.log("found userID")
                return file['users'][i]
            }
        }
        // transfer entire backup file to __users array
        else{
            __users.push(file['users'][i])
            return
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
        //console.log(user)
        write_to_file(user)
    },

    getUser: function(userID){

        if (userID >= __users.length || userID < 0){
            // if ram db crashed
            if (__users.length == 0){
                readBackup(-1)
                user = findUser(userID)
                console.log(user)
                return user
            }
            console.log("userID is not in users database")
        }
        else{
            user = findUser(userID)
            console.log(user)
            return user
        }

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










