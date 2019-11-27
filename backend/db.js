// Custom database for the HitchHike backend

/* overview of structures

* Users stored in hashmap with the key being their username

* Users written to backup file upon signup

* Rides store in two data structues:
    * R-tree stores rideID according to 2D location
    * rideID stored in hashmap where departure time is the key

*/

var security = require("./security.js");
const fs = require('fs'); 
var HashMap = require('hashmap');
var Heap = require('heap');
var RBush = require('rbush');
var knn = require('rbush-knn');

// storing users in hashmap where key is unique email
var __users = new HashMap();

// store ride objects in R tree for spacial lookup
var __rides = new RBush();

// store departureTime: rideID
var rideQueue = new Heap(function(a, b) {
    return a.departs.getTime() - b.departs.getTime();
});


//review object to be stored within user object
function Review(reviewerUserName, receiverUserName, message, rating){
    this.reviewerUserName = reviewerUserName;
    this.receiverUserName = receiverUserName;
    this.message = message;
    this.rating = rating;
}

// user object that will be stored in ram
function User(fName, lName, username, password, email, pNumber, DOB){
    this.username = username;
    this.password = security.encryptPasword(password)
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.DOB = DOB;
    this.pNumber = pNumber;
    this.postedRides = [];
    this.requestedRides = [];
    this.reviewsGiven = [];
    this.reviewsReceived = [];

    //new users start unvarified
    this.userStatus = {
        verified: false    
    }

    __users.set(username, this)
}

// ride object
function Rides(username, origin, destination, seats, dateString){
    this.rideID = module.exports.RideID(username, dateString);
    this.origin = origin;
    this.destination = destination;
    this.maxSeats = seats;
    this.departTime = dateString
}

// remove rides who's departure time has passed
function updateRides(){
    var now = new Date()

    if (rideQueue.size() > 0){
        var nextRide = rideQueue.peek()

        // departure time has passed
        if (now.getTime() > nextRide.departs.getTime()) {

            rideID = nextRide.ID
            rideQueue.pop()
            __rides.remove(rideID)

            console.log("ride with ID = ", rideID, "has expired, moving it to pastRides")
        }
    }
}

// make updateRides run every 30 seconds 
let timerId = setInterval(() => updateRides(), 30000);

// find user in __users
function findUser(username){
    try{ return __users.get(username)}
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

        // check if user_obj is already in file
        backup.users.push(user_obj)

        fs.writeFile("backup.json", JSON.stringify(backup), function(err){
            if (err) throw err;
        });
    })
}

// read users from file
function readBackup(username, status){
    console.log("usage: Reading __users from disk")
    
    var text = fs.readFileSync('backup.json')
    var file = JSON.parse(text)

    for (var i=0; i<file['users'].length; i++){
        
        // seach for single user
        if (status >= 0){ 
            if (file['users'][i]['username'] == username){
                console.log("found user")
                return file['users'][i]
            }
        }
        // transfer entire backup file to __users array
        else{
            __users.set(username, file['users'][i])
            return
        }
    }
}

function reviewArraySum(arr){
    var len = arr.length;
    var sum = 0;

    if(len == 0){
        return [sum, len];
    }

    for(i in arr){
        sum += arr[i].rating;
    }

    return [sum , len];
}

// public functions availiable to index.js
module.exports = {

    newUser: function(fName, lName, username, password, email, pNumber, DOB){
        console.log("creating new user")

        if (__users.has(username)){
            throw Error ('username in use')
        }

        var user = new User(fName, lName, username, password, email, DOB)

        // writing user to backup immediately for now
        write_to_file(user)

        return user
    },

    getUser: function(username){
        
        // if db crashed, read from file
        if (__users.size == 0){
            readBackup(username, -1)
            user = findUser(username)
            //console.log(user)
            return user
        }
        else{
            user = findUser(username)
            return user
        }
    },

    updateUser: function(fName, lName, username, password, email, pNumber, DOB){
        try{
            user = module.exports.deleteUser(username)
            newUser = module.exports.newUser(fName, lName, username, password, email, pNumber, DOB)
            return newUser
        }
        catch{
            throw Error ("could not remove", username, "from database while updating user")
        }
    },

    deleteUser: function(username){
        console.log("removing user from database")

        if (__users.has(username)){
            __users.delete(username)
            console.log("user deleted successfuly")
        }
        else{
            console.log("could not delete user because email was not found")
        }
    },

    // date is in format: "August 19, 1975 23:15:30"
    postRide: function(username, origin, destination, seats, dateString){
        
        //console.log("posting a ride")
        user = module.exports.getUser(username)

        /*if (user.userStatus.verified === false){
            throw Error ("must be verified to post a ride")
        }*/

        date = new Date(dateString)

        // store by day, hour, minutes
        departure = (date.getDay() + ":" + date.getHours() + ":" + date.getMinutes())

        // create the ride
        var ride = new Rides(username, origin, destination, seats, date)
        //console.log(ride.RideID)

        const node = {
            minX: origin.x,
            minY: origin.y,
            maxX: origin.x,
            maxY: origin.y,
            Ride: ride
        }

        // add rideID to min heap of rides
        rideQueue.push({"departs": date, "ID": ride.rideID});

        // add rideID to user's rides attribute
        user.postedRides.push(node)

        __rides.insert(node);
        //console.log(node)
    },

    deleteRide: function(username){
        try{
            user = module.exports.getUser(username)
            rideID = user.postedRides[user.postedRides.length-1]
            __rides.remove(rideID)
            console.log("successfuly deleted ride for", username)
        }
        catch{
            throw Error ("could not remove", rideID, "from database")
        }
    },

    updateRide: function(username, rideID, origin, destination, seats, departure){
        try{
          node = __rides.remove(rideID).data.children[0].Ride
        //   console.log(node)
          node.origin = origin
          node.destination = destination
          node.seats = seats
          node.departure = departure
          __rides.insert(node)
          return node 
        }
        catch{
            throw Error ("could not update ride from database")
        }
    },

    findRide: function(location, dateString){
        
        console.log("looking for rides")

        var date = new Date(dateString)
        var buffer = 2 // two hour windows

        console.log(date.getDay())

        var neighbors = knn(__rides, location.x, location.y, 5, function (item) {
            return (item.Ride.departTime.getDay() === date.getDay())
        });
        return neighbors
    },

    testBackup: function(username){
        console.log("size of database before backup read", __users.size)
        readBackup(username, -1)
        console.log("size after backup read", __users.size)
    },

    hash: function(password){
        return security.encryptPasword(password)
    },

    RideID: function(username, date){
        departure = (date.getDay() + ":" + date.getHours() + ":" + date.getMinutes())
        return (username + ":" + departure)
    },

    allRides: function(){
        return __rides;
    },

    giveReview: function(reviewerUserName, receiverUserName, message, rating){
        try{
            var reviewerS = getUser(reviewerUserName).reviewsGiven;
            var receiverS = getUser(receiverUserName).reviewsReceived;
            var toPut = new Review(reviewerUserName, receiverUserName, message, rating);
            reviewerS.push(toPut);
            receiverS.push(toPut);
            this.updateUser(reviewerUserName, "reviewsGiven", reviewerS, reviewerS);
            this.updateUser(receiverUserName, "reviewsGiven", receiverS, receiverS);
            return "success";
        } catch(e){
            return e;
        }
    },

    getRating: function(username){
        try{
            var user = getUser(username);
            var giveSum = reviewArraySum(user.reviewsGiven);
            var gotSum = reviewArraySum(user.reviewsReceived);
            var numReviews = giveSum[1] + gotSum[1];
            var sumReviews = giveSum[0] + gotSum[0];
            if(numReviews == 0) return 0; else return sumReviews / numReviews;
        } catch(e){
            return e;
        }
    }
}

