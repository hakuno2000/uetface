var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var connector=require('./connectDB');
var dbURL = 'mongodb://localhost/uetface';
var db = require('mongoose').connect(dbURL);
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
        var connection = connector(mysql);
        connection.query("select * from sinhvien where tai_khoan='"+req.body.username+"'",
            function (err, rows, fields) {
                if (err) throw err;
                if(rows.length==0||rows.length>1) res.render('index',{title:'UETFace',Log_rp:'Tài khoản hoặc mật khẩu không đúng!'});
                rows.forEach(function (row) {
                    console.log(row);
                    if (req.body.password == row.mat_khau) {
                        req.session.username = req.body.username;
                        req.session.password = req.body.password;
                        req.session.user_id =row.ma_sinh_vien;
                        res.redirect('/users');
                    }else{
                        res.redirect('/');
                    }
                });
            }
        );
        connection.end(function(err){
            if(err) throw err;
        });
    }else if(req.body.login){
        res.render('index',{title:'UETFace',Log_rp:'Chưa nhập tài khoản hoặc mật khẩu!'});
    }else if(req.body.reg_user!=''&&req.body.reg_email!=''&&req.body.reg_pass!=''&&req.body.std_name!=''
            &&req.body.std_grade!=''&&req.body.std_class!=''&&req.body.std_id!=''){
        var connection = connector(mysql);
        connection.query('select * from sinhvien where tai_khoan=\"'+req.body.reg_user+'\"',
            function(err,rows,fields){
                if(err) throw err;
                if(rows.length==0) {
                    connection.query('select * from sinhvien where email=\"'+req.body.reg_email+'\"',
                        function(err,rows,fields){
                            if(err) throw err;
                            if(rows.length==0){


                                connection.query('select * from sinhvien where ma_sinh_vien=\"'+req.body.std_id+'\"',function(err,rows,fields){
                                    if(err) throw err;
                                    if(rows.length==0) {
                                        var newUser={
                                            ma_sinh_vien:req.body.std_id,
                                            tai_khoan:req.body.reg_user,
                                            email:req.body.reg_email,
                                            mat_khau:req.body.reg_pass,
                                            gioi_tinh:req.body.sex,
                                            ho_va_ten:req.body.std_name,
                                            khoa_nam_hoc: req.body.std_grade,
                                            lop_khoa_hoc: req.body.std_class
                                        }
                                        console.log(newUser);
                                        Register(req,res,newUser,connection);
                                    }
                                    else{
                                        res.render('index',{title:'UETFace',Reg_rp:'Mã SV đã tồn tại.'});
                                    }
                                });
                            }
                            else {
                                res.render('index',{title:'UETFace',Reg_rp:'Email đã tồn tại.'});
                            }
                        }
                    );
                }else{
                    res.render('index',{title:'UETFace',Reg_rp:'Tài khoản đã tồn tại.'});
                }
            }
        );
    }
    else{
        res.render('index',{title:'Uet Face',Reg_rp:'Bạn đã nhập thiếu thông tin.'});
    }


})
function Register(req,res,User,connection){
    connection.query('INSERT INTO sinhvien SET ?',User,function(err,results){
        if(err) throw err;
    });
    connection.end(function(err){
        req.session.username=User.tai_khoan;
        req.session.password=User.mat_khau;
        req.session.user_id=User.ma_sinh_vien;
        res.render('index',{title:'UETFace',Reg_rp:'Đăng kí thành công.'});
        if(err) throw err;
    });
}
module.exports = router;
