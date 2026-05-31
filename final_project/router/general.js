const axios = require('axios');
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).send(JSON.stringify(books[isbn], null, 4));
});
  
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let result = {};

  for (let key in books) {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let result = {};

  for (let key in books) {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});

public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
});
// Get all books using async-await with Axios
public_users.get('/asyncbooks', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching books"
    });
  }
});



// Get all books using Promises with Axios
public_users.get('/promisebooks', function (req, res) {

  axios.get('http://localhost:5000/')
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error fetching books"
      });
    });

});
module.exports.general = public_users;
