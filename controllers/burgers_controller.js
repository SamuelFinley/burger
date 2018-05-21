const express = require("express");
const router = express.Router();
let burger = require("../models/burger.js");
router.get("/", function(req, res) {
    res.redirect('/burgers');
});


router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		var hbsObject = { burgers: data };
		res.render('index', hbsObject);
	});
});

router.post("/burgers/", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    res.redirect('/burgers');
  });
});

router.post("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
        res.redirect('/burgers');
    }
  });
});

router.post('/burgers/delete/:id', function(req, res) {
  let condition = "id = " + req.params.id;
  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
        res.redirect('/burgers');
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
