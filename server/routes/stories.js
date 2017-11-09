var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {
      id: 1,
      products: [
        {
          id: 1,
          name: 'apple',
          count: 3,
        },
        {
          id: 2,
          name: 'lime',
          count: 10,
        }
      ]
    },
    {
      id: 2,
      products: [
        {
          id: 1,
          name: 'orange',
          count: 4,
        },
        {
          id: 2,
          name: 'bananas',
          count: 20,
        }
      ]
    }
  ]);
});

module.exports = router;
