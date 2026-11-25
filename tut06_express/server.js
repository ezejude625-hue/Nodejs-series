const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

app.get(["/", "/index", "/index.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(["/new-page", "/new-page.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get(["/old-page", "/old-page.html"], (req, res) => {
  res.redirect(301, "new-page.html"); //* 302 by default
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//? ROUTE CHAINING

//! Part One

app.get(
  ["/hello", "/hello.html"],
  (req, res, next) => {
    console.log("Attempting to call the next function");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

//! Part Two

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
};

app.get(["/hello", "/hello.html"], [one, two, three]);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
