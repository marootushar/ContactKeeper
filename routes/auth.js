const express = require("express");
const router = express.Router();

// route        GET api/auth
// desc         Get Logged in user
// access       Private
router.get("/", (req, res) => {
  res.send("Get Logged IN user");
});

// route        POST api/auth
// desc         Auth User and Get Token
// access       Public
router.post("/", (req, res) => {
  res.send("Login for users");
});

module.exports = router;
