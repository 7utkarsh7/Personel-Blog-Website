//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser: true, useUnifiedTopology: true});

const blogSchema ={
  title: String,
  content: String
};

const Post = mongoose.model("Post",blogSchema);



const homeStartingContent = "Welcome to my personal blog page. At Daily, we a bunch of enthusiastic geeks track down all the latest gaming updates, filtered and furnished right on your device. Reviews are inherently subjective with a goal to be simply honest about what we feel about any given game. We find writing about games to be cathartic and hopefully, over time you can come to trust us. Hopefully ";
const aboutContent = "This is a project based website developed using the latest stacks such as Node, Express, Bootstrap, MongoDB.";
const contactContent = " Reach us at abcd@xyz.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/", function(req, res) {
  Post.find({}, function(err, posts){

     res.render("home", {
       StartingContent: homeStartingContent,
       posts: posts

       });

   });

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutC: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactc: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});
app.post("/compose", function(req, res) {

  const post = new Post({
    title:req.body.postTitle,
    content: req.body.postContent
  });

  post.save( function(err){
    if(!err){
        res.redirect("/");
    }
  });

});

app.get("/posts/:postid", function(req, res) {
  const requestedid = req.params.postid;


    Post.findOne({_id:requestedid}, function(err,post ){
      if(!err){
        res.render("post",{newTitle:post.title, newContent:post.content});
      }
      else {
        console.log("Not found");
      }
    });




});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
