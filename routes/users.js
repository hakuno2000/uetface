var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.username){
        res.render('users',{user:req.session.username});
    }
    else{
        res.redirect('/');
    }
});

module.exports = router;
