const express = require("express");
const router = express.Router();

router.post("/", (req, res) => res.send("Contacts Works!"));

module.exports = router;
