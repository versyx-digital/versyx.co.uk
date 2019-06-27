var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Versyx Digital.' });
});

router.get('/privacy', function(req, res, next) {
  res.render('privacy-policy', { title: 'Versyx Digital.' });
});

module.exports = router;
