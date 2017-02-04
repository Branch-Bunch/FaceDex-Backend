var express = require('express');
var router = express.Router();

/* POST home page. */
router.post('/', function(req, res, next) {
	let name = req.param('name', null);
	let links = req.param('links', null);
  res.render('index', { title: 'Enroll a personDex' });
});

module.exports = router;
