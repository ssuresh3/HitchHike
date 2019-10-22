i//Welcome to the backend, this is Aman, your host, who has some tips about using this file.
//1. do not use the default route (app.get("/")), always make a specific route based on the action
//2. do not use

const express = require('express')
const app = express()
const port = 8000
const sgMail = require('@sendgrid/mail');
var db = require("./db.js")
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.listen(port, () => {
    console.log("Hi!");
})

//parse incoming requests as JSON
app.use(express.json());

//base url of server
const baseURL = "http://localhost:8000/";

//example call from the app:
//axios.get("http://localhost:8080/", function(response){
//  console.log(response.data); will print "Welcome"
//})
//if you use this, make sure to comment why you used this
app.get("/", (req, res) => {
    res.send("Welcome!");
})

//example function to send email
var emailsSent = 0;
const ex = {
    to: 'kailas@ucsc.edu',
    from: 'test@gethitchhike.ml',
    subject: 'This is an example email'
};
app.get("/sendmeanemail",(reg,res)=>{
    emailsSent++;
    ex.html = 'You have recieved <strong>'+emailsSent+'</strong> emails since the server was restarted!'
    sgMail.send(ex).then(() => {
        res.send('Email sent!');
    }).catch((error) => {
        console.log('error', error);
    });
})




const verificationEmail = {
    from: "welcome@gethitchhike.ml",
    template_id: "d-0e933e0acf104ea0998fb4e627225d02",
    dynamic_template_data: {}
}


//generate new code and send verification email
function verifyUser(id){
    var code = Math.random().toString(10).substring(2,7);

    var user = db.getUser(id);

    if(user != null){
        user.userStatus.code = code;
	verificationEmail.to = user.email;
        verificationEmail.dynamic_template_data = {
	    user: user.fName,
            url: baseURL + "verify/user/"+user.userID+"?v="+code
	}
        console.log(verificationEmail);	
	sgMail.send(verificationEmail).catch((e)=>{
	    console.log('error',e);
	});
    }
}

//endpoint for creating new user
app.post("/signup",(req,res)=>{

    var userID = -1;
    try{
        var data = req.body.user;
	userID = db.newUser(data.fName,data.lName,data.email,data.DOB);
        
        res.send({success:true});	
    } catch(e){
        console.log(e);
	res.send({success:false});
    }

    if(userID>=0)verifyUser(userID);
})

app.get("/verify/user/:userID",(req,res)=>{
    try{
	var user = db.getUser(req.params.userID);
	if(user.userStatus.code != req.query.v){
	    throw "Invalid verification code";
	}
	user.userStatus.verified = true;
	user.userStatus.code = -1;
        res.send("You are verified!");
    } catch(e){
        console.log(e);
        res.send("verification failed :(");
    }
});

//example call from the app:
////example call from the app:
//axios.get("http://localhost:8080/anotherExample?name=Aman", function(response){
//  console.log(response.data); will print "Aman"
//})
//if you want to pass in more than one argument: ?name=Aman&lastName=Prasad
app.get("/anotherExample", (req, res) => {
    res.send(req.query.name);
})

// login endpoint
app.post("/Login", (req, res) => {
    try{
        var user = db.getUser(req.body.email);
        if (user.password == (db.hash(req.body.password)){
            res.send(user);
        } else {
            res.send("Invalid password");
        }
    }catch(e){
        res.send("Login failed");
    }
})








