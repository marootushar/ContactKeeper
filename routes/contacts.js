const express = require("express");
const router = express.Router();

// route        GET api/contacts
// desc         Get Contacts
// access       Private
router.get("/", (req, res) => {
    res.send("Show Contacts");
});

// route        POST api/contacts
// desc         Add Contacts
// access       Private
router.post("/", (req, res) => {
    res.send("Add Contacts");
});

// route        PUT api/contacts/:id
// desc         Update Contacts
// access       Private
router.put("/:id", (req, res) => {
    res.send("Update Contacts");
});

// route        DELETE api/contacts/:id
// desc         Delete Contacts
// access       Private
router.delete("/:id", (req, res) => {
    res.send("Delete Contacts");
});



module.exports = router;
