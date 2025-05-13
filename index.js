import express from "express";
import path from "path";
import bodyParser from "body-parser";
 

import { fileURLToPath } from "url";  // ✅ Import fileURLToPath

import { empCollection } from "./model/model.js"; // Adjust the import as needed

import "./db/db.js"; // Import the database connection module using .js extension
import { name } from "ejs";
import fetch from "node-fetch"; // ✅ Import fetch to make API call to Python backend

const app = express();
const port = 3000;

// ✅ Fix: Define __filename and __dirname properly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Calculate the directory path based on the current module's file path
const viewsPath = path.join(__dirname, "views");

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/advisory", (req, res) => {
  res.render("advisory.ejs");
});

app.get("/bot", (req, res) => {
  res.render("bot.ejs");
});

app.get("/locator", (req, res) => {
  res.render("locator.ejs");
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs");
});

app.get("/team", (req, res) => {
  res.render("team.ejs");
});


app.get("/predict-form", (req, res) => {
  res.render("predict");
});


// after login
app.get("/userhome", (req, res) => {
  res.render("userhome.ejs");
}); 

app.get("/userabout", (req, res) => {
  res.render("userabout.ejs");
});

app.get("/useradvisory", (req, res) => {
  res.render("useradvisory.ejs");
});

app.get("/userblog", (req, res) => {
  res.render("userblog.ejs");
});


app.get("/assesment", (req, res) => {
  res.render("assesment.ejs");
});




app.get("/profile", (req, res) => {
  res.render("profile.ejs");
});

// db - signup/registration
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/empdata", async(req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password === cpassword){
      const empData = new empCollection({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        cpassword : req.body.cpassword
      });

      const postData = await empData.save();
      res.render("login.ejs");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.send(error);
  }
});

// login
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/loginPage", async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.loginpassword;
    const getEmail = await empCollection.findOne({email : email});

    if(getEmail.password === password){
      res.render("userhome.ejs");
    } else {
      res.send("Password/credentials are not matching");
    }
  } catch (error) {
    res.send(error);
  }
});

// ✅ ML Route to call Python Flask API
app.get("/predict", (req, res) => {
  res.render("predict.ejs");
});

app.post("/predict", async (req, res) => {
  const inputData = {
    age: req.body.age,
    sleep_hours: req.body.sleep_hours,
    exercise_hours: req.body.exercise_hours,
    screen_time: req.body.screen_time,
    diet_score: req.body.diet_score
  };

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData)
    });

    const result = await response.json();
    res.render("predict.ejs", { prediction: result.prediction });
  } catch (error) {
    res.send("Error fetching prediction from model: " + error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
