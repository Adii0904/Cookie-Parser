const express = require("express");

const app = express();

//this is for cookie parser;
const cookieParser = require("cookie-parser"); //signed cookie

app.use(cookieParser("mycookiSecretKey"));

app.get("/", (req, res) => {
  const mycookie = req.signedCookies.username;
  if (!mycookie) {
    return res.send(
      `<h1>this is home page and the cookie is not define yet</h1>`
    );
  } else {
    res.send(
      `<h1>this is home page and the cookie is <strong>${mycookie}</strong></h1>`
    );
  }
});

app.get("/setcookie", (req, res) => {
  res.cookie("username", "my-first-cookie", {
    maxAge: 90000,
    httpOnly: true,
    signed: true,
    // secure:true, // ye check kartea hain ki hamra htpts request hain ya nahi
  });
  res.send("cookie has been set in your device");
});

app.get("/getcookie", (req, res) => {
  //to get the cookie;
  // const username = req.cookies.username;

  //! this is for signed coookie;
  const username = req.signedCookies.username;
  if (!username) {
    res.send("cookie not found");
  } else {
    res.send(`<p>cookie found and the cookied is</p> <h1> ${username}<h1/>`);
  }
});

app.get("deletecookie", (req, res) => {
  //ham es route mein cookie ko delte jkarnege;
  res.clearCookie("username");
  res.send("cookie has been deleted successfully");
});

app.listen(3000, () => {
  console.log("my server is running at port number at 3000");
});
