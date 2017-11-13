let express = require('express');
let router = express.Router();
let stores = require('../data/stores');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let search = req.query.q;
    if(search) {
        console.log('s', search);
        stores = stores.filter(store => {
            store.products = store.products.filter(product =>  product.name.indexOf(search) !== -1);
            return store;
        });
    }
    res.json(stores);

});

module.exports = router;
