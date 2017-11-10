let express = require('express');
let router = express.Router();
let stores = require('../data/stores');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(stores);
});

module.exports = router;
