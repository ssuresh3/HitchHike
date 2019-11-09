//Welcome to the backend, this is Aman, your host, who has some tips about using this file.
//1. do not use the default route (app.get("/")), always make a specific route based on the action
//2. do not use

const express = require('express')
const app = express()
const port = 8000
const sgMail = require('@sendgrid/mail');
var db = require("./db.js")
sgMail.setApiKey("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");

app.listen(port, () => {
    console.log("Welcome to the HitchHike internal API!");
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
    console.log("fuck me in the ass");
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
function verifyUser(user){
    var code = Math.random().toString(10).substring(2,7);

    if(user != null){
        user.userStatus.code = code;
        verificationEmail.to = user.email;
        verificationEmail.dynamic_template_data = {
            user: user.fName,
                url: baseURL + "verify/user/"+user.username+"?v="+code
        }
        //console.log(verificationEmail);   
        sgMail.send(verificationEmail).catch((e)=>{
            console.log('error',e);
        });
    }
}

//endpoint for creating new user
app.post("/signup", (req,res)=>{
    var user = -1;
    try{
        var data = req.body;
        var user = db.newUser(data.fName,data.lName,data.username,data.password,data.email,data.phone,data.DOB);
        console.log("new user signup")
        res.send({success:true});   
    } catch(e){
        console.log(e);
    res.send({success:false,reason:e});
    }

    if(user!=-1)verifyUser(user);
});

// login endpoint
app.post("/login", (req, res) => {
    try{
        var user = db.getUser(req.body.username);
        //console.log(user.password)
        //console.log(db.hash(req.body.password))
        if (user.password === (db.hash(req.body.password))){
            res.send({success:true, data:user});
        } else {
            res.send({success:false,reason:"Invalid password"});
        }
    }catch(e){
        res.send({success:false,reason:"Login failed"});
    }
});

// post ride enpoint
app.post("/rides/postRide", (req, res)=>{
    console.log(req.body);
    try{
        var data = req.body
        var user = db.getUser(data.username)

        if (user.userStatus.verified === false)verifyUser(user);

        var Ride = db.postRide(data.username,data.origin,data.destination,data.seats,data.departure);
        res.send({success:true});   
    } catch(e){
        console.log(e);
    res.send({success:false,reason:e});
    }
});

//update ride endpoint
app.post("/rides/updateRide", (req, res)=>{
    try{
        var data = req.body
        var user = db.getUser(data.username)

       // if (user.userStatus.verified === false)verifyUser(user);

        var Ride = db.updateRide(data.username,data.rideID,data.origin,data.destination,data.seats,data.departure);
        res.send({success:true});   
    } catch(e){
        console.log(e);
        res.send({success:false,reason:"Ride not updated!"});
    }
});

// post ride enpoint
app.post("/rides/findRide", (req, res)=>{
    try{
        var data = req.body;
        //console.log(data)
        var rides = db.findRide(data.origin,data.departure);
        res.send({success:true,body:rides});   
    } catch(e){
        console.log(e);
        res.send({success:false,"reason":e});
    }
});

// get all rides
app.post("/rides/allRides", (req, res)=>{
    try{
        var rides = db.allRides();
        res.send({success:true,body:rides});   
    } catch(e){
        console.log(e);
        res.send({success:false,"reason":e});
    }
});


// verify users email
app.get("/verify/user/:username", (req, res)=>{
    try{
    var user = db.getUser(req.params.username);
    if(user.userStatus.code != req.query.v){
        throw "Invalid verification code";
    }
    user.userStatus.verified = true;
        res.send({success:true,reason:"You are verified!"});
    } catch(e){
        console.log(e);
        res.send({success:false,reason:"verification failed"});
    }
});

/*example call from the app:
example call from the app:
axios.get("http://localhost:8080/anotherExample?name=Aman", function(response){
  console.log(response.data); will print "Aman"
})
if you want to pass in more than one argument: ?name=Aman&lastName=Prasad
*/
app.get("/anotherExample", (req, res) => {
    res.send(req.query.name)
});

app.get("/allRides", (req,res) =>{
   	console.log("hello");
	res.send(db.allRides());
})





