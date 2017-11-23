let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let comments = requireUncached('../data/comments');

    res.json(comments);
});

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

module.exports = router;
