//Welcome to the backend, this is Aman, your host, who has some tips about using this file.
//1. do not use the default route (app.get("/")), always make a specific route based on the action
//2. do not use

const express = require('express')
const app = express()
const port = 8000
const sgMail = require('@sendgrid/mail');
var db = require("./db.js")
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// db.hello()

app.listen(port, () => {
    console.log("Hi!");
})


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
    to: 'amaprasa@ucsc.edu',
    from: 'server@hitchhike.com',
    subject: 'This is an example email'
};
app.get("/sendamananemail",(reg,res)=>{
    emailsSent++;
    ex.html = 'You have recieved <strong>'+emailsSent+'</strong> emails since the server was restarted!'
    sgMail.send(ex);
    res.send("Email sent!");
})

//example call from the app:
////example call from the app:
//axios.get("http://localhost:8080/anotherExample?name=Aman", function(response){
//  console.log(response.data); will print "Aman"
//})
//if you want to pass in more than one argument: ?name=Aman&lastName=Prasad
app.get("/anotherExample", (req, res) => {
    res.send(req.query.name);
})

app.post("/anotherExample", (req, res) => {
    try{
        var user = db.getUser(req.body.email);
        if(user.password == req.body.password){
            res.send(user);
        } else {
            res.send("Invalid password");
        }
    }catch(e){
        res.send("Login failed");
    }
})

