const Mongo = require("./services/mongoService")
const express = require("express");
const RandomID = require("./services/RandomId");
const states = require("./utils/states.json");
const bodyParser = require("body-parser");

const app = express();

app.listen(3000, () => {
    console.log("Server started successfully");
});

app.use(bodyParser.urlencoded());

app.post("/service/register", (req, res) => {
    var date = new Date();
    var today = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    var randomID = new RandomID();
    var regInitials = randomID.generateID(req.body.state, req.body.city);
    var mongo = new Mongo();
    console.log(today);
    console.log(req.body.state);
    console.log(req.body.city);
    console.log(regInitials);
    var document = {
        dogName : req.body.dogName,
        breed : req.body.breed,
        dob : new Date(req.body.dob),
        color : req.body.color,
        height : req.body.height,
        weight : req.body.weight,
        collarID : req.body.collarID,
        ownerName : req.body.ownerName,
        email : req.body.email,
        password : req.body.password,
        regDate : today,
        state : req.body.state,
        city : req.body.city,
        address : req.body.address,
        regNo : regInitials
    };

    mongo.insertDocument(document, (data) => {
        if(data.status === 1) {
            res.json({registrationID : document.regNo});
        } else {
            res.json(data);
        }
    });
});


app.get("/service/get", (req, res) => {
    console.log(req.query.registrationID);
    console.log(req.query.password);
    var mongo = new Mongo();
    var document = {
        regNo : req.query.registrationID,
        password : req.query.password
    };

    mongo.findDocument(document, data => {
        res.json(data);
    });
});

app.get("/service/getAll", (req, res) => {
    if(req.query.type === "admin") {
        var mongo = new Mongo();
        mongo.findAllDocuments(data => {
            res.json(data);
        });
    } else {
        res.json({status : 0});
    }
});


app.get("/service/updateOwner", (req, res) => {
    var mongo = new Mongo();
    var document = {
        regNo : req.query.registrationID
    };
    mongo.findDocument(document, data => {
        if(data.hasOwnProperty("status") === false) {
            var update = {
                $set : {
                    ownerName : req.query.ownerName,
                    email : req.query.email,
                    password : req.query.password,
                    state : req.query.state,
                    city : req.query.city,
                    address : req.query.address
                }
            };

            mongo.updateDocument(document, update, response => {
                res.json(response);
            });
        }
    });
});


app.get("/service/changeAddress", (req, res) => {

    console.log(req.query.registrationID);
    console.log(req.query.state);
    console.log(req.query.city);
    console.log(req.query.address);
    var document = {
        regNo : req.query.registrationID
    };
    var mongo = new Mongo();
    mongo.findDocument(document, data => {
        console.log(data);
        if(data.hasOwnProperty("status") === false) {
            var update = {
                $set : {
                    state : req.query.state,
                    city : req.query.city,
                    address : req.query.address
                }
            };

            mongo.updateDocument(document, update, response => {
                res.json(data);
            });
        }
    }); 
});


app.get("/service/states", (req, res) => {
    res.json(states);
});


app.get("/service/userTypes", (req, res) => {
    res.json({type1 : "general", type2 : "admin"});
});