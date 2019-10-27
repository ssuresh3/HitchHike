/*

- endpoint unit test
- send request to index.js

*/

const axios = require('axios')

// test signup functionality
function test1() {
 	try {
    	const response = axios.post("http://localhost:8000/signup", {
   			fName: "Cody",
   			lName: "Hartsook",
   			username: "chartsoo",
   			password: "password12345",
   			email: "chartsoo@ucsc.edu",
   			DOB: "7/11/1997"
    	});

    	if (response.data["success"] === true) console.log("test1 passed")
    	if (response.data["success"] === false) {
    		console.log("test1 failed")
    		console.log("  -", response.data["reason"])
    	}

 	} catch (error) {
 		console.log("test1 failed with error")
		//console.error(error);
	}
}

// test login functionality
function test2() {
 	try {
    	const response = axios.post("http://localhost:8000/login", {
   			username: "chartsoo",
   			password: "password12345",
    	});

    	if (response.data["success"] === true) console.log("test2 passed")
    	if (response.data["success"] === false) {
    		console.log("test2 failed")
    		console.log("  - ", response.data["reason"])
    	}

 	} catch (error) {
 		console.log("test2 failed with error")
		//console.error(error);
	}
}

// data.username,data.origin,data.destination,data.seats,data.departure

// test login functionality
function test3() {
 	try {
    	const response = axios.post("http://localhost:8000//postRide", {
   			username: "chartsoo",
   			password: "password12345",
   			origin: {"x": 100, "y": 120},
   			destination: {"x": 140, "y": 170},
   			seats: 4,
   			departure: "October 20, 2019 23:15:30"
    	});

    	if (response.data["success"] === true) console.log("test3 passed")
    	if (response.data["success"] === false) {
    		console.log("test3 failed")
    		console.log("  - ", response.data["reason"])
    	}

 	} catch (error) {
 		console.log("test3 failed with error")
		//console.error(error);
	}
}

// testing starts here

try {
	console.log("----------------------------------------------------------------")
	test1()
} 
catch {
	console.log("error occured, continue testing")
}
try {
	console.log("----------------------------------------------------------------")
	test2()
} 
catch {
	console.log("error occured, continue testing")
}
try {
	console.log("----------------------------------------------------------------")
	test3()
}
catch {
	console.log("error occured, continue testing")
}

console.log("----------------------------------------------------------------")





