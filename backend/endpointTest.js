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
	}
    console.log("----------------------------------------------------------------")
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
	}
    console.log("----------------------------------------------------------------")
}

// test login functionality
async function test3() {
 	try {
    	const response = await axios.post("http://localhost:8000/rides/postRide", {
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
	}
    console.log("----------------------------------------------------------------")
}

// test login functionality
async function test4() {
    try {
        const response = await axios.post("http://localhost:8000/rides/findRide", {
            origin: {"x": 100, "y": 120},
            departure: "October 20, 2019 23:15:30",
            numResults: 10
        });

        //console.log(response)
        if (response.data["success"] === true) console.log("test4 passed")
        if (response.data["success"] === false) {
            console.log("test4 failed")
            console.log("  - ", response.data["reason"])
        }

    } catch (error) {
        console.log("test4 failed with error", error)
    }
    console.log("----------------------------------------------------------------")
}

// testing starts here
console.log("----------------------------------------------------------------")
test1()
test2()
test3()
test4()





