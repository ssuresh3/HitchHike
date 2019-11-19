// test db.js file

var db = require("./db.js")

function unitTest(){

	// user tests
	var user = db.newUser("cody", "hartsook", "chartsoo", "1234HitchHike", "chartsoo@ucsc.edu", "7/11/1997")
	console.log(user)
	//db.testBackup("chartsoo")
	//db.getUser("chartsoo@ucsc.edu")
	//db.updateUser("chartsoo", "fName", "cody", "Cody")

	// ride tests
	var origin = {"x":100, "y":100}
	//	var origin2 = {"x": 120, "y": 95}
	var origin2 = {"x": 200, "y": 200}
	var destination = {"x": 500, "y": 500}
	var seats = 4
	var time = "August 19, 2018 23:15:30"
	var time2 = "August 20, 2018 23:30:30"

	db.postRide("chartsoo", origin, destination, seats, time)
	node = db.updateRide("chartsoo", "chartsoo:1:20:23:15", origin, destination ,5, Date("August 20, 2018 23:30:30"))
	// db.findRide(origin, time2)
	console.log("updated ride\n", node)
	//db.deleteRide("chartsoo")

}

unitTest()