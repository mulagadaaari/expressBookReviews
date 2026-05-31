const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  let usersWithSameName = users.filter((user) => {
    return user.username === username;
  });

  return usersWithSameName.length > 0;
}

const authenticatedUser = (username, password) => { //returns boolean
  let validUsers = users.filter((user) => {
    return user.username === username && user.password === password;
  });

  return validUsers.length > 0;
}

// Register a new user
regd_users.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({
      message: "Unable to register user."
    });
  }

  if (!isValid(username)) {
    users.push({
      username: username,
      password: password
    });

    return res.status(200).json({
      message: "User successfully registered. Now you can login"
    });
  }

  return res.status(404).json({
    message: "User already exists!"
  });
});

// only registered users can login
regd_users.post("/login", (req, res) => {
  return res.status(300).json({
    message: "Yet to be implemented"
  });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  return res.status(300).json({
    message: "Yet to be implemented"
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;