var express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

var app = express.Router();

app.get("/getAccessToken", async function (req, res) {
  req.query.code;
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("http://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data.access_token : " + data.access_token);
      res.json(data);
    });
});

app.get("/getUserData", async function (req, res) {
  req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

module.exports = app;
