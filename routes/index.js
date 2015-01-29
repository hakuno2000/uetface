var express = require('express');
var router = express.Router();
var mysql=require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.username){
        res.redirect('/users');
    }else {
        res.render('index', { title: 'UETFace' });
    }
});
router.post('/',function(req,res,next){
    if(req.body.username!=''&&req.body.password&&req.body.login!='') {
        var connectionConfig = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'uetface'
        };
        var connection = mysql.createConnection(connectionConfig);
        connection.query("select * from user where username='"+req.body.username+"'",
            function (err, rows, fields) {
                if (err) throw err;
                if(rows.length==0) res.render('index',{title:'UETFace',Log_rp:'Tài khoản hoặc mật khẩu không đúng!'});
                rows.forEach(function (row) {
                    if (req.body.password == row.password) {
                        req.session.username = req.body.username;
                        req.session.password = req.body.password;
                        res.redirect('/users');
                    }
                });
            }
        );
        connection.end(function(err){
            if(err) throw err;
        });
    }else if(req.body.login){
        res.render('index',{title:'UETFace',Log_rp:'Chưa nhập tài khoản hoặc mật khẩu!'});
    }else if(req.body.reg_user!=''&&req.body.reg_email!=''&&req.body.reg_pass!=''){

        var connectionConfig = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'uetface'
        };

        var connection = mysql.createConnection(connectionConfig);
        connection.query('select * from user where username=\"'+req.body.reg_user+'\"',
            function(err,rows,fields){
                if(err) throw err;
                if(rows.length==0) {
                    connection.query('select * from user where email=\"'+req.body.reg_email+'\"',
                        function(err,rows,fields){
                            if(err) throw err;
                            if(rows.length==0) {
                                var newUser={
                                    username:req.body.reg_user,
                                    email:req.body.reg_email,
                                    password:req.body.reg_pass,
                                    sex:req.body.sex
                                }
                                Register(req,res,newUser,connection);
                            }
                            else{
                                res.render('index',{title:'UETFace',Reg_rp:'Email đã tồn tại.'})
                            }
                        }
                    );
                }else{
                    res.render('index',{title:'UETFace',Reg_rp:'Tài khoản đã tồn tại.'})
                }
            }
        );
    }
    else{
        res.render('index',{title:'Uet Face',Reg_rp:'Bạn đã nhập thiếu thông tin.'});
    }


})
function Register(req,res,User,connection){
    connection.query('INSERT INTO user SET ?',User,function(err,results){
        if(err) throw err;
    });
    connection.end(function(err){
        req.session.username=User.username;
        req.session.password=User.password;
        res.render('index',{title:'UETFace',Reg_rp:'Đăng kí thành công.'});
        if(err) throw err;
    });
}
module.exports = router;
