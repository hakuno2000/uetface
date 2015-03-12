var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var dbURL=require('./data/dbURL');
var md5=require('./decode/md5');
var secretKey=require('./secretKey');
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
        var user_login=require('./data/models/user_login');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        user_login.findOne({'tai_khoan':req.body.username},function(err,result){
            if (err) console.log(err);
            var isNull=require('./isNull');
            if(!isNull(result)){
                if (md5.MD5(req.body.password+secretKey).toString() == result.mat_khau) {
                    req.session.username = req.body.username;
                    //req.session.password = req.body.password;
                    //req.session.user_id =row.ma_sinh_vien;
                    res.redirect('/users');
                }
            }else{
                res.redirect('/');
            }
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        });
    }else if(req.body.login){
        res.render('index',{title:'UETFace',Log_rp:'Chưa nhập tài khoản hoặc mật khẩu!'});
    }else if(req.body.reg_user!=''&&req.body.reg_email!=''&&req.body.reg_pass!=''&&req.body.std_name!=''
            &&req.body.std_grade!=''&&req.body.std_class!=''&&req.body.std_id!=''){
        var user_reg=require('./data/models/user_reg');
        usr_reg.findOne({'ma_sinh_vien':req.body.std_id},function(err,result){
            if(!isNull(result)){ res.render('index',{})};
        });
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
