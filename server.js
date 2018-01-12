var express = require("express");
var app = express();
var port = 8000;
var path = require("path");
var bp = require("body-parser");
var session = require("express-session");

app.use(bp.urlencoded());
app.use(express.static(path.join(__dirname, "/client")));
app.use(session({secret: "cat"}));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    content: String
}, {timestamps: true})

mongoose.model("Message", messageSchema);
var Message = mongoose.model("Message");
mongoose.connect("mongodb://localhost/jan2018message");

app.get("/", function(req,res){
    Message.find({}, function(err, messages){
        return res.render("index.ejs", {messages: messages});
    })
});

app.post("/process", function(req,res){
    Message.create({content: req.body.content}, function(err, message){
        res.redirect("/");
    })
})

app.listen(port, function(){
    console.log("listening");
})