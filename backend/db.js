// Define a custome databse

var security = require("./security.js")
const fs = require('fs');       // opening files
var HashMap = require('hashmap');

// storing users in hashmap where key is unique email
var __users = new HashMap()

// might want to store rides in k-d tree for efficient spacial searching
var __rides = new HashMap()

// user object that will be stored in ran 
function User(fName, lName, username, password, email, DOB){
    this.username = username;
    this.password = security.encryptPasword(password)
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.DOB = DOB;
    this.rides = [];
    
    //new users start unvarified
    this.userStatus = {
        verified: false    
    }

    __users.set(email, this)
}

// ride object
function Rides(username, origin, destination, seats, time){
    this.rideID = newRide();
    this.origin = origin;
    this.destination = destination;
    this.maxSeats = seats;
    this.departTime = time;

    __rides.set(userID, this)
}

// hash the user's email to create userID
function newRide(email){
    console.log("generate new unique rideID")
    return 0
}

// find user in __users
function findUser(email){
    try{ return __users.get(email)}
    catch(e){
        console.log(e)
        return e
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

        //console.log(backup)
    })
}

// read users from file
function readBackup(email, status){
    console.log("usage: Reading __users from disk")
    
    var text = fs.readFileSync('backup.json')
    var file = JSON.parse(text)

    for (var i=0; i<file['users'].length; i++){
        
        // seach for single user
        if (status >= 0){ 
            if (file['users'][i]['email'] == email){
                console.log("found user")
                return file['users'][i]
            }
        }
        // transfer entire backup file to __users array
        else{
            __users.set(email, file['users'][i])
            return
        }
    }
}

// public functions availiable to index.js
module.exports = {

    newUser: function(fName, lName, username, password, email, DOB){
        console.log("creating new user")

        var user = new User(fName, lName, username, password, email, DOB)

        // writing user to backup immediately for now
        console.log(user)
        write_to_file(user)

        return user
    },

    getUser: function(email){
        
        // if db crashed, read from file
        if (__users.size == 0){
            readBackup(email, -1)
            user = findUser(userID)
            console.log(user)
            return user
        }
        else{
            user = findUser(email)
            //console.log(user)
            return user
        }
    },

    updateUser: function(email, field, oldP, newP){
        console.log("updating user")
        try{
            user = module.exports.getUser(email)
            if (field == "password"){
                security.updatePassword(email, oldP, newP)
            }
            user[field] = newP
            __users.set(email, user)
            console.log(__users.get(email))
        }
        catch(e){
            console.log("was not able to update userID", userID)
        }
    },

    deleteUser: function(email){
        console.log("removing user from database")

        if (__users.has(email)){
            __users.delete(email)
            console.log("user deleted successfuly")
        }
        else{
            console.log("could not delete user because email was not found")
        }
    },

    postRide: function(email, origin, destination, time){
        console.log("post a ride from x to y at time t")
    },

    deleteRide: function(email, rideID){
        console.log("cancel a ride given its ID")
    },

    updateRide: function(email, rideID){
        console.log("update a posted ride")
    },

    findRide: function(email, location, time){
        console.log("find all rides near me")
    },

    testBackup: function(email){
        console.log("size of database before backup read", __users.size)
        readBackup(email, -1)
        console.log("size after backup read", __users.size)
    },

    hash: function(password){
        return security.encryptPasword(password)
    },
}










