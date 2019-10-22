// test db.js file

var db = require("./db.js")

function unitTest(){

	db.newUser("cody", "hartsook", "chartsoo", "1234HitchHike", "chartsoo@ucsc.edu", "7/11/1997")
	//db.testBackup("chartsoo@ucsc.edu")
	//db.getUser("chartsoo@ucsc.edu")
	//db.updateUser("chartsoo@ucsc.edu", "fName", "cody", "Cody")
	//b.deleteUser("chartsoo@ucsc.edu")
	console.log(db.hash("helloWorld"))

}

unitTest()