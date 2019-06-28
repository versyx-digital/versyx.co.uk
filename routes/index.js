const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Versyx Digital.' });
});

router.get('/privacy', (req, res) => {
  res.render('privacy-policy', { title: 'Versyx Digital.' });
});

module.exports = router;
