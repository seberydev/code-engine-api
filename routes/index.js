var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Code Engine" });
});

router.get("/mysearchs", function (req, res, next) {
  res.render("userSearch", { title: "My Searchs" });
});

module.exports = router;
