const fs = require('fs');
const db = require('../db');

var mockData = require('./mock_data.json')
var user = mockData['user']

// test new user
test('the data is a new user', () => {
  expect(db.newUser(user.fName, user.lName, user.username, user.password, user.email, user.pNumber, user.DOB).email).toBe('chartsoo@ucsc.edu')
});

// test get user
test('the data is a new user', () => {
  expect(db.getUser(user.username).email).toBe('chartsoo@ucsc.edu')
});

// test posting a ride and finding a ride
test('posting a ride', () => {

	var origin = {"x":90, "y":-100}
	var destination = {"x": 70, "y": -104}
	var seats = 4
	var time = "August 19, 2020 23:15:30"
	db.postRide(user.username, origin, destination, seats, time)

	db.findRide(origin, time)
	expect(db.getUser(user.username).email).toBe('chartsoo@ucsc.edu')
	
})

