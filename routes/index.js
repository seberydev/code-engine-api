var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/mysearch", function (req, res, next) {
  res.render("mysearch", { title: "mysearch" });
});

module.exports = router;
