import express from "express";
import bcrypt from "bcrypt";
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
app.listen(8000, () => console.log("running"));



// 
// register -> data -> bcrypt