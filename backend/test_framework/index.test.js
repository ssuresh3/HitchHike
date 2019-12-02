//index.js jest file

const fs = require('fs');
const db = require('../db');
const axios = require('axios');
var mockData = require('./mock_data.json');

test('testing signup', async () => {
	var user = mockData['users'][1]
 	const data = await axios.post("http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/signup", {
   			fName: user.fName,
   			lName: user.lName,
   			username: user.username,
   			password: user.password,
   			email: user.email,
   			DOB: user.DOB
    });
 	expect(data.data["success"]).toBe(true);
});

/*test('testing login', async () => {
	var user = mockData['users'][0]
 	const data = await axios.post("http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/login", {
   			username: user.username,
   			password: user.password,
    });
 	expect(data.data["success"]).toBe(true);
});*/

test('testing post ride', async () => {
	var user = mockData['users'][1]
	var ride = mockData['rides'][1]
	const response = await axios.post("http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/rides/postRide", {
   			username: user.username,
   			password: user.password,
   			origin: ride.origin,
   			destination: ride.destination,
   			seats: ride.seats,
   			departure: ride.departure
    	});
})

