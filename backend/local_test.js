// test db.js file

var db = require("./db.js")

function unitTest(){

	db.newUser("c", "h", "chartsoo@ucsc.edu", "7/11/1997")

}

unitTest()