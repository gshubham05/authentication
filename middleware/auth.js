import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  console.log("middleware");

  let { token } = req.headers;
  let t1 = JSON.stringify(token);
  console.log("token from backend ", t1);
  // if (!token) {
  //   return res.redirect("/login");
  // }
  
  try {
    let d1 = null;
    // console.log("-----------------------");
    jwt.verify(token, "codeware", (err, d) => (d1 = d));
    if (!d1) {
      console.log("verify token : ,", d1);
      console.log("token match nahi hua");
      return res.redirect("/login");
    }
    console.log("verify token : ,", d1);
    req.user = d1;
    // console.log("-----------------------");
    next();
  } catch (error) {
    console.log(error);
  }
};
