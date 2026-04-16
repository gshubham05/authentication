import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "./middleware/auth.js";
let app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());
let userData = [
  {
    name: "Shubham",
    email: "gshubham.05@gmail.com",
    pwd: "1234",
  },
];
app.get("/register", (req, res) => res.render("register"));
app.post("/register", (req, res) => {
  const { name, email, pwd } = req.body;
  let user1 = userData.find((i) => i.name == name);
  if (user1) {
    return res.json({
      success: false,
      msg: "User is already exist",
      user1,
    });
  }
  // bcrypt

  bcrypt.genSalt(10, function (err, salt) {
    console.log(salt);
    bcrypt.hash(pwd, salt, function (err, hash) {
      console.log("hash ", hash);
      userData.push({
        name,
        pwd: hash,
        email,
      });
      console.log(userData);
      res.json({
        msg: "Successfully Created",
        success: true,
        userData,
      });
    });
  });
});

// login Route
app.get("/login", (req, res) => res.render("login"));
app.post("/login", async (req, res) => {
  const { email, pwd } = req.body;
  let d = userData.find((i) => i.email == email);

  if (d == undefined) {
    return res.json({
      msg: "User is not exist",
      success: false,
    });
  }

  let isMatch = await bcrypt.compare(pwd, d.pwd);
  if (!isMatch) {
    return res.json({
      msg: "invalid password",
      success: false,
    });
  }
  let name = d.name;
  let token = jwt.sign({ name, email }, "codeware");
  console.log(token);
  res.json({
    msg: "Welcome to my world",
    success: true,
    token,
  });
});

// dashboard
app.get("/dashboard", auth, (req, res) => {
  console.log(req.user);
  res.render("dashboard");
});

app.listen(8000, () => console.log("running"));
