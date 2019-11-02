// test db.js file

var db = require("./db.js")

function unitTest(){

	// user tests
	db.newUser("cody", "hartsook", "chartsoo", "1234HitchHike", "chartsoo@ucsc.edu", "7/11/1997")
	//db.testBackup("chartsoo")
	//db.getUser("chartsoo@ucsc.edu")
	//db.updateUser("chartsoo", "fName", "cody", "Cody")
	//b.deleteUser("chartsoo@ucsc.edu")

	// ride tests
	var origin = {"x":100, "y":100}
//	var origin2 = {"x": 120, "y": 95}
	var origin2 = {"x": 200, "y": 200}
	var destination = {"x": 500, "y": 500}
	var seats = 4
	var time = "August 19, 2018 23:15:30"
	var time2 = "August 20, 2018 23:30:30"

	db.postRide("chartsoo", origin, destination, seats, time)
	db.updateRide("chartsoo", "chartsoo:1:20:23:15", origin, destination ,5, Date("August 20, 2018 23:30:30"))
	// db.findRide(origin, time2)
	db.deleteRide("chartsoo")

}

unitTest()