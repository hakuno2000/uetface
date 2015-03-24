var express = require('express');
var router = express.Router();
var userNotLoggedIn=require('./user_not_logged_in')
/* GET users listing. */
router.get('/',userNotLoggedIn, function(req, res, next) {
        res.render('users/users',{title:'4UET - user',user:req.session.username});
});

module.exports = router;
