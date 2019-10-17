var __users = []
var __rides = []

function User(fName, lName, email, DOB, seats){
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.DOB = DOB;
    this.rides = [];
    this.numSeats = seats;
    this.userID = __users.length

    __users.push(this)
}

function Rides()

module.exports = {

    hello: function (){
        console.log("hello")
    },

    returnX: function(){
        return ++x;
    }

}