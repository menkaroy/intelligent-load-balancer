const express = require("express");
const router = express.Router();

router.get("/fast", (req, res) => {
  setTimeout(() => res.send("Fast response"), 100);
});

router.get("/slow", (req, res) => {
  setTimeout(() => res.send("Slow response"), 1000);
});

module.exports = router;
