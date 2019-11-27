const fs = require('fs');
const db = require('../db');

var mockData = require('./mock_data.json')

// test new user
test('the data is a new user', () => {
	var user = mockData['users'][0]
 	expect(db.newUser(user.fName, user.lName, user.username, user.password, user.email, user.pNumber, user.DOB).email).toBe('chartsoo@ucsc.edu')
});

// test get user
test('the data is a new user', () => {
	var user = mockData['users'][0]
 	expect(db.getUser(user.username).email).toBe('chartsoo@ucsc.edu')
});

// test posting a ride and finding a ride
test('posting a ride', () => {
	var user = mockData['users'][0]
	var ride = mockData['rides'][0]
	
	db.postRide(user.username, ride.origin, ride.destination, ride.seats, ride.departure)
	expect(db.getUser(user.username).email).toBe('chartsoo@ucsc.edu')
});

// test find ride
test('finding posted ride', () => {
	var user = mockData['users'][0]
	var ride = mockData['rides'][0]
	var request = mockData['requestedRides'][0]

	var rideFound = db.findRide(request.origin, request.departure)
	expect(rideFound).toBeDefined()
});



