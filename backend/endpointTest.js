/*

- endpoint unit test
- send request to index.js

*/

const axios = require('axios')

// test signup functionality
async function test1() {
 	try {
    	const response = await axios.post("http://localhost:8000/signup", {
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
async function test2() {
 	try {
    	const response = await axios.post("http://localhost:8000/login", {
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

// testing starts here

try {
	test1();
} 
catch {
	console.log("error occured, continue testing")
}
try {
	test2();
} 
catch {
	console.log("error occured, continue testing")
}





