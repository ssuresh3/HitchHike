// test db.js file

var db = require("./db.js")

function unitTest(){

	//db.newUser("c", "h", "chartsoo@ucsc.edu", "7/11/1997")
	//db.testRead(0)
	//db.getUser(0)
	db.updateUser(0, "fName", "c", "d")

}

unitTest()