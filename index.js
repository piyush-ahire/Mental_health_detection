import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";  // ✅ Import fileURLToPath


import { empCollection } from "./model/model.js"; // Adjust the import as needed


import "./db/db.js"; // Import the database connection module using .js extension
import { name } from "ejs";

const app = express();
const port = 3000;

// ✅ Fix: Define __dirname properly
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

// app.get("/userlogin", (req, res) => {
//   res.render("userLogin.ejs");
// });

app.get("/team", (req, res) => {
  res.render("team.ejs");
});



//after login
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




//db - signup/registration
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/empdata", async(req, res) => {
    // console.log(req.body.name);
    // res.send(req.body.name);
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
        //res.send(postData);
  
        res.render("login.ejs");
        
      }else{
        res.send("password are not matching");
      }
     
    } catch (error) {
      res.send(error);
    }
   
  });


  //login
  app.get("/login", (req, res) => {
    res.render("login.ejs");
  });


  app.post("/loginPage", async(req, res) => {
  
    try {
      
    const email = req.body.email;
    const password = req.body.loginpassword;
  
    const getEmail = await empCollection.findOne({email : email});
  
    //new one
    // const ph = getEmail.phone;
    // console.log(ph);
  
    // console.log(getEmail.password);
    // res.send(getEmail.password);
  
    if(getEmail.password  === password){
      res.render("userhome.ejs");
    }
    else{
      res.send("Password/credentials are not matching");
    }
  
    } catch (error) {
      res.send(error);
    }
  
  
  });



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
