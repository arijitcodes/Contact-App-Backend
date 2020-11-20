const express = require("express");
const router = express.Router();

router.post("/", (req, res) => res.send("Users Works!"));

module.exports = router;
