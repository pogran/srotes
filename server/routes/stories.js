let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let stores = requireUncached('../data/stores');
    let search = req.query.q;

    if(search) {
        stores = stores.filter(store => {
          store.products = store.products.filter(product =>  product.name.indexOf(search) !== -1);
          return store;
        });
    }
    res.json(stores);
});

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

module.exports = router;
