var express = require('express');
var router = express.Router();
var mysql=require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.username){
        res.redirect('/users');
    }else {
        res.render('index', { title: 'My Website' });
    }
});
router.post('/',function(req,res,next){
    if(req.body.username&&req.body.password) {
        var connectionConfig = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'uetface'
        };
        var connection = mysql.createConnection(connectionConfig);
        connection.query('select * from user where username=\"' + req.body.username + '\"',
            function (err, rows, fields) {
                if (err) throw err;
                if(rows.length==0) res.redirect('/');
                rows.forEach(function (row) {
                    if (req.body.password == row.password) {
                        req.session.username = req.body.username;
                        req.session.password = req.body.password;
                        res.redirect('/users');
                    }
                    else{
                        res.redirect('/');
                    }
                });
            }
        );
    }

})

module.exports = router;
