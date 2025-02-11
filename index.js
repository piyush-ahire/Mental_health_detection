import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
  res.render("index.ejs")
})

app.get("/about", (req, res)=>{
    res.render("about.ejs")
})

app.get("/advisory", (req, res)=>{
    res.render("advisory.ejs")
})

app.get("/bot", (req, res)=>{
    res.render("bot.ejs")
})
  

app.get("/locator", (req, res)=>{
    res.render("locator.ejs")
})

app.get("/blog", (req, res)=>{
    res.render("blog.ejs")
})

app.get("/login", (req, res)=>{
    res.render("login.ejs")
})

app.get("/team", (req, res)=>{
    res.render("team.ejs")
})
  




 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});