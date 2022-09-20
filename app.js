const express = require('express');
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Fod", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req,res){

const day = date();

    res.render("list", {listTitle: day, newListItem: items});
    
});

app.post("/", function(req, res){

    const item = req.body.newItem;

    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "work List", newListItem: workItems});
})


app.get("/about", function(req, res){
    res.render("about");
});





app.listen(3000, function () {
    console.log("server is running on 3000")
});